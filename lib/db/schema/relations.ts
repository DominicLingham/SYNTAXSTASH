import { relations } from 'drizzle-orm'

import { account, user } from './auth'
import { diary } from './diary'
import { diaryEntry } from './diary-entry'
import { resource } from './resource'
import { resourceTag } from './resource-tag'
import { tag } from './tag'

export const resourceRelations = relations(resource, ({ many }) => ({
  resourceTags: many(resourceTag),
}))

export const tagRelations = relations(tag, ({ many }) => ({
  resourceTags: many(resourceTag),
}))

export const resourceTagRelations = relations(resourceTag, ({ one }) => ({
  resource: one(resource, {
    fields: [resourceTag.resourceId],
    references: [resource.id],
  }),
  tag: one(tag, {
    fields: [resourceTag.tagId],
    references: [tag.id],
  }),
}))

export const diaryRelations = relations(diary, ({ one, many }) => ({
  user: one(user, {
    fields: [diary.userId],
    references: [user.id],
  }),
  entries: many(diaryEntry),
}))

export const diaryEntryRelations = relations(diaryEntry, ({ one }) => ({
  diary: one(diary, {
    fields: [diaryEntry.diaryId],
    references: [diary.id],
  }),
}))

export const userRelations = relations(user, ({ one, many }) => ({
  diary: one(diary, {
    fields: [user.id],
    references: [diary.userId],
  }),
  accounts: many(account),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))
