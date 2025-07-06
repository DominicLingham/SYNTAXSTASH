import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
})
export type InsertResource = typeof resources.$inferInsert
export type SelectResource = typeof resources.$inferSelect
