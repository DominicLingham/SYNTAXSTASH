import { defineConfig } from 'drizzle-kit'
import env from './lib/env'

export default defineConfig({
  schema: './lib/db/schema/index.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.NODE_ENV === 'development' ? env.DATABASE_URL_DEV : env.DATABASE_URL_PROD,
  },
})
