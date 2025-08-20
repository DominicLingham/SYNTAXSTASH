import type { JSONContent } from '@tiptap/vue-3'
import { z } from 'zod'

const JSONContentSchema: z.ZodType<JSONContent> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    attrs: z.record(z.unknown()).optional(),
    content: z.array(JSONContentSchema).optional(),
    marks: z.array(
      z.object({
        type: z.string(),
        attrs: z.record(z.unknown()).optional(),
      }),
    ).optional(),
    text: z.string().optional(),
  }),
)

export const addDiarySchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(1000),
  isPublic: z.boolean(),
})

export const addDiaryEntrySchema = z.object({
  title: z.string()
    .min(1, { message: 'Title cannot be empty' })
    .max(50, { message: 'Title cannot be more than 50 characters' }),
  content: JSONContentSchema,
})

export type AddDiaryType = typeof addDiarySchema._type
export type AddDiaryEntryType = typeof addDiaryEntrySchema._type
