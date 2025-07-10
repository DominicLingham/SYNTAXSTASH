import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

import { user } from './auth'

export const tag = pgTable('tag', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  userId: text().references(() => user.id),
  createdAt: integer().notNull().$default(() => Date.now()),
})

export type InsertTag = typeof tag.$inferInsert
export type SelectTag = typeof tag.$inferSelect
