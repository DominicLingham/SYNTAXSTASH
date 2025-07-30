import { bigint, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { resource } from './resource'
import { tag } from './tag'

export const resourceTag = pgTable('resourceTag', {
  resourceId: uuid().notNull().references(() => resource.id, { onDelete: 'cascade' }),
  tagId: uuid().notNull().references(() => tag.id, { onDelete: 'cascade' }),
  createdAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()),
}, table => ({
  pk: primaryKey({
    columns: [table.resourceId, table.tagId],
  }),
}))

export type InsertResourceTag = typeof resourceTag.$inferInsert
export type SelectResourceTag = typeof resourceTag.$inferSelect
