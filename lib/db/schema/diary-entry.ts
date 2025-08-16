import type { JSONContent } from '@tiptap/vue-3'
import { bigint, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core'
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

export type SelectDiaryEntry = typeof diaryEntry.$inferSelect
