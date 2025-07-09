import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

import { user } from './auth'

export const resource = pgTable('resource', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  content: text(),
  url: text(),
  icon: text().notNull(),
  isExternal: boolean().notNull(),
  isFavourite: boolean().notNull().default(false),
  isPublic: boolean().notNull().default(false),
  userId: uuid().references(() => user.id),
  createdAt: integer().notNull().$default(() => Date.now()),
  updatedAt: integer().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})

export type InsertResource = typeof resource.$inferInsert
export type SelectResource = typeof resource.$inferSelect
