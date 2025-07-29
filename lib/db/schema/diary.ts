import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const diary = pgTable('diary', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  userId: text().notNull().references(() => user.id),
  isPublic: boolean().notNull().default(false),
})
