import { boolean, integer, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { user } from './auth'

export const resource = pgTable('resource', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  content: jsonb(),
  url: text(),
  icon: text().notNull(),
  isExternal: boolean().notNull(),
  isFavourite: boolean().notNull().default(false),
  isPublic: boolean().notNull().default(false),
  userId: text().references(() => user.id),
  createdAt: integer().notNull().$default(() => Date.now()),
  updatedAt: integer().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  deletedAt: integer(),
})

export const InsertResource = createInsertSchema(resource, {
  name: field => field.min(1).max(150),
  description: field => field.max(300),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
