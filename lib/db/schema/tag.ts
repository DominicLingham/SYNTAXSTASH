import { bigint, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const tag = pgTable('tag', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  userId: text().references(() => user.id),
  createdAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()),
}, tag => ({
  uniqueUserTagName: uniqueIndex('unique_user_tag_name').on(tag.userId, tag.name),
}))
