import { bigint, boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const diary = pgTable('diary', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  userId: text().notNull().references(() => user.id).unique(),
  isPublic: boolean().notNull().default(false),
  createdAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()),
  updatedAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  deletedAt: bigint({ mode: 'number' }),
})

export type SelectDiary = typeof diary.$inferSelect
