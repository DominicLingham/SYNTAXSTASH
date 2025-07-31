import { bigint, boolean, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core'
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
  createdAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()),
  updatedAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  deletedAt: bigint({ mode: 'number' }),
})
