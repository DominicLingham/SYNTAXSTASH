import { bigint, boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
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

export const InsertDiary = createInsertSchema(diary, {
  name: field => field.min(1).max(50),
  description: field => field.max(1000),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
