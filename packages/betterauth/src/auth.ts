import { db, schema } from '@fabel/db'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { type BetterAuthOptions, betterAuth } from 'better-auth'

export const sharedAuthOptions = {
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes short, so session revocation isn't delayed
    },
    expiresIn: 60 * 60 * 24 * 30, // 30 days total session lifetime
    updateAge: 60 * 60 * 24, // refresh the expiry every 24h
  },
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    },
  },
} satisfies BetterAuthOptions

export const authValidator = betterAuth(sharedAuthOptions)

export type Session = typeof authValidator.$Infer.Session.session
export type User = typeof authValidator.$Infer.Session.user
export type AuthSession = {
  session: Session
  user: User
}
