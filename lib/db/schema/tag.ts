import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const tag = pgTable('tag', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  createdAt: integer().notNull().$default(() => Date.now()),
})

export type InsertTag = typeof tag.$inferInsert
export type SelectTag = typeof tag.$inferSelect
