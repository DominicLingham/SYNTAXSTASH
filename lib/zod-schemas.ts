import { z } from 'zod'

export const addDiarySchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(1000),
  isPublic: z.boolean(),
})

export type AddDiaryType = typeof addDiarySchema._type
