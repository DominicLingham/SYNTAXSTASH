import type { User } from 'better-auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthMiddleware } from 'better-auth/api'

import { db } from './db/db'
import env from './env'

export type UserWithId = Omit<User, 'id'> & {
  id: string
}

export const auth = betterAuth({
  // Hook to prevent duplicate call to /get-session on client side if logged out
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/get-session') {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          })
        }
      }
    }),
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
})
