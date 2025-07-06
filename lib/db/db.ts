import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import env from '~/lib/env'
import * as schema from './schema'

const databaseURL = env.NODE_ENV === 'development' ? env.DATABASE_URL_DEV : env.DATABASE_URL_PROD

const sql = neon(databaseURL)
export const db = drizzle({
  client: sql,
  schema,
})
