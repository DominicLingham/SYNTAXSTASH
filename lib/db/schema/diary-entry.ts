import type { JSONContent } from '@tiptap/vue-3'
import { integer, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { diary } from './diary'

export const diaryEntry = pgTable('diaryEntry', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  content: jsonb().$type<JSONContent>().notNull(),
  diaryId: uuid().notNull().references(() => diary.id),
  createdAt: integer().notNull().$default(() => Date.now()),
  updatedAt: integer().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  deletedAt: integer(),
})

export type InsertDiaryEntry = typeof diaryEntry.$inferInsert
export type SelectDiaryEntry = typeof diaryEntry.$inferSelect
