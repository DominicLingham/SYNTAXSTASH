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

export const updateDiaryEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string()
    .min(1, { message: 'Title cannot be empty' })
    .max(50, { message: 'Title cannot be more than 50 characters' }),
  content: JSONContentSchema,
})

export const deleteDiaryEntrySchema = z.object({
  id: z.string().uuid(),
})

export const updateUserSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name cannot be empty' })
    .max(100, { message: 'Name cannot be more than 100 characters' }),
  image: z.string().url({ message: 'Must be a valid URL' }).nullable().optional(),
})

export const setUsernameSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username cannot be more than 20 characters' })
    .regex(/^[a-z]/i, { message: 'Username must start with a letter' })
    .regex(/^\w+$/, { message: 'Username can only contain letters, numbers, and underscores' })
    .transform(val => val.toLowerCase()),
})

export type AddDiaryType = typeof addDiarySchema._type
export type AddDiaryEntryType = typeof addDiaryEntrySchema._type
export type UpdateDiaryEntryType = typeof updateDiaryEntrySchema._type
export type DeleteDiaryEntryType = typeof deleteDiaryEntrySchema._type
export type UpdateUserType = typeof updateUserSchema._type
export type SetUsernameType = typeof setUsernameSchema._type
