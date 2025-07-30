import { integer, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

import { createInsertSchema } from 'drizzle-zod'
import { user } from './auth'

export const tag = pgTable('tag', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  userId: text().references(() => user.id),
  createdAt: integer().notNull().$default(() => Date.now()),
}, tag => ({
  uniqueUserTagName: uniqueIndex('unique_user_tag_name').on(tag.userId, tag.name),
}))

export const InsertTag = createInsertSchema(tag, {
  name: field => field.min(1).max(32),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
})
