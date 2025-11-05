import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { initTRPC, TRPCError } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';
import { parse } from 'cookie';

import { users } from '../../drizzle/schema';
import { getDb } from './db';
import {
  SESSION_COOKIE_NAME,
  SessionPayload,
  createSessionCookie,
  clearSessionCookie,
  verifySessionToken,
} from './sdk';
import { registerGoogleOAuth } from './oauth.google';

export interface Context {
  req: express.Request;
  res: express.Response;
  db: ReturnType<typeof getDb>;
  session: SessionPayload | null;
  user: typeof users.$inferSelect | null;
}

const t = initTRPC.context<Context>().create();

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const authRouter = t.router({
  loginLocal: t.procedure.input(authLoginSchema).mutation(async ({ input, ctx }) => {
    const db = ctx.db;
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1);

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Credenciais inválidas',
      });
    }

    if (user.provider !== 'LOCAL') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Conta vinculada a outro provedor',
      });
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Credenciais inválidas',
      });
    }

    const sessionCookie = createSessionCookie({
      sub: user.id,
      email: user.email,
      name: user.name,
      provider: 'LOCAL',
      role: user.role,
    });

    ctx.res.append('Set-Cookie', sessionCookie);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    };
  }),
  me: t.procedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return { user: null };
    }

    return {
      user: {
        id: ctx.user.id,
        name: ctx.user.name,
        email: ctx.user.email,
        role: ctx.user.role,
        provider: ctx.user.provider,
      },
    };
  }),
  logout: t.procedure.mutation(async ({ ctx }) => {
    ctx.res.append('Set-Cookie', clearSessionCookie());
    return { success: true };
  }),
});

export const appRouter = t.router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

export async function createContext({
  req,
  res,
}: {
  req: express.Request;
  res: express.Response;
}): Promise<Context> {
  const db = getDb();
  const cookies = parse(req.headers.cookie ?? '');
  const token = cookies[SESSION_COOKIE_NAME];
  let session: SessionPayload | null = null;
  let user: typeof users.$inferSelect | null = null;

  if (token) {
    session = verifySessionToken(token);
    if (session) {
      const [found] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.sub))
        .limit(1);
      user = found ?? null;
    }
  }

  return {
    req,
    res,
    db,
    session,
    user,
  };
}

export function createServer() {
  const app = express();

  const allowedOrigins = process.env.APP_ORIGIN
    ? process.env.APP_ORIGIN.split(',').map((origin) => origin.trim())
    : true;

  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));

  app.use(express.json());

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  registerGoogleOAuth(app);

  return app;
}
