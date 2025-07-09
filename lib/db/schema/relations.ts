import { relations } from 'drizzle-orm'

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
