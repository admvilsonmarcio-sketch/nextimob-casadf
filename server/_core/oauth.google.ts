import type { Express, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { parse, serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { users } from '../../drizzle/schema';
import { getDb } from './db';
import {
  createSessionCookie,
  clearSessionCookie,
  getOAuthServerUrl,
  resolveOAuthUrl,
} from './sdk';

const GOOGLE_AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';
const OAUTH_STATE_COOKIE = 'app_oauth_state';

function getRedirectUri(req: Request) {
  if (process.env.GOOGLE_REDIRECT_URI) {
    return process.env.GOOGLE_REDIRECT_URI;
  }

  const protocol = req.headers['x-forwarded-proto'] ?? req.protocol;
  const host = req.headers['x-forwarded-host'] ?? req.get('host');
  return `${protocol}://${host}/api/oauth/google/callback`;
}

async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
  }

  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Failed to exchange token: ${details}`);
  }

  return response.json() as Promise<{
    access_token: string;
    id_token?: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
  }>;
}

async function fetchGoogleProfile(accessToken: string) {
  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Failed to fetch Google profile: ${details}`);
  }

  return response.json() as Promise<{
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email: string;
    email_verified: boolean;
  }>;
}

async function handleGoogleCallback(req: Request, res: Response) {
  const failureRedirect = process.env.OAUTH_FAILURE_REDIRECT ?? '/login';
  try {
    const { state, code } = req.query;
    if (typeof state !== 'string' || typeof code !== 'string') {
      throw new Error('Invalid OAuth callback parameters');
    }

    const cookies = parse(req.headers.cookie ?? '');
    const savedState = cookies[OAUTH_STATE_COOKIE];

    res.append('Set-Cookie', serialize(OAUTH_STATE_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    }));

    if (!savedState || savedState !== state) {
      throw new Error('OAuth state mismatch');
    }

    const redirectUri = getRedirectUri(req);
    const { access_token } = await exchangeCodeForTokens(code, redirectUri);
    const profile = await fetchGoogleProfile(access_token);

    if (!profile.email) {
      throw new Error('Google profile missing email');
    }

    const db = getDb();
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, profile.email))
      .limit(1);

    let user = existingUser;

    if (!user) {
      const randomPassword = randomBytes(24).toString('hex');
      const passwordHash = await bcrypt.hash(randomPassword, 12);
      await db.insert(users).values({
        email: profile.email,
        name: profile.name ?? 'Google User',
        passwordHash,
        provider: 'GOOGLE',
      });

      const [created] = await db
        .select()
        .from(users)
        .where(eq(users.email, profile.email))
        .limit(1);

      if (!created) {
        throw new Error('Failed to create Google user');
      }

      user = created;
    } else if (user.provider !== 'GOOGLE') {
      await db
        .update(users)
        .set({ provider: 'GOOGLE' })
        .where(eq(users.id, user.id));
    }

    const sessionCookie = createSessionCookie({
      sub: user.id,
      email: user.email,
      name: user.name,
      provider: 'GOOGLE',
      role: user.role,
    });

    res.append('Set-Cookie', sessionCookie);

    const successRedirect = process.env.OAUTH_SUCCESS_REDIRECT ?? '/';
    res.redirect(successRedirect);
  } catch (error) {
    console.error('[google-oauth] callback failed', error);
    res.append('Set-Cookie', clearSessionCookie());
    res.redirect(failureRedirect);
  }
}

function handleGoogleRedirect(req: Request, res: Response) {
  const portalUrl = getOAuthServerUrl();
  if (portalUrl) {
    res.redirect(resolveOAuthUrl('/api/oauth/google'));
    return;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    res.status(500).json({
      error: 'Missing GOOGLE_CLIENT_ID environment variable',
    });
    return;
  }

  const redirectUri = getRedirectUri(req);
  const state = randomBytes(32).toString('hex');

  res.append('Set-Cookie', serialize(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  }));

  const authorizeUrl = new URL(GOOGLE_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('scope', 'openid email profile');
  authorizeUrl.searchParams.set('prompt', 'select_account');
  authorizeUrl.searchParams.set('state', state);

  res.redirect(authorizeUrl.toString());
}

export function registerGoogleOAuth(app: Express) {
  app.get('/api/oauth/google', handleGoogleRedirect);
  app.get('/api/oauth/google/callback', handleGoogleCallback);
}
