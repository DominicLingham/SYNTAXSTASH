import type { JSONContent } from '@tiptap/vue-3'
import { bigint, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { diary } from './diary'

export const diaryEntry = pgTable('diaryEntry', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  content: jsonb().$type<JSONContent>().notNull(),
  diaryId: uuid().notNull().references(() => diary.id),
  createdAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()),
  updatedAt: bigint({ mode: 'number' }).notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  deletedAt: bigint({ mode: 'number' }),
})

export const InsertDiaryEntry = createInsertSchema(diaryEntry, {
  title: field => field.min(1).max(50),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
