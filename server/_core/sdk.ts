import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export const SESSION_COOKIE_NAME = 'app_session_id';

const JWT_SECRET = process.env.JWT_SECRET ?? 'insecure-development-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

export interface SessionPayload {
  sub: number;
  email: string;
  name: string;
  provider: 'LOCAL' | 'GOOGLE';
  role: string;
}

export function signSessionToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch (error) {
    return null;
  }
}

export function createSessionCookie(payload: SessionPayload) {
  const token = signSessionToken(payload);
  return serialize(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  return serialize(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

export function getOAuthServerUrl() {
  return process.env.OAUTH_SERVER_URL?.trim() || null;
}

export function resolveOAuthUrl(path: string) {
  const external = getOAuthServerUrl();
  if (!external) {
    return path;
  }
  return `${external.replace(/\/$/, '')}${path}`;
}
