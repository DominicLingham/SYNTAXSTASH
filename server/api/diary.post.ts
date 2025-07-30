import { db } from '~/lib/db/db'
import { diary, InsertDiary } from '~/lib/db/schema'

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }))
  }
  const result = await readValidatedBody(event, InsertDiary.safeParse)

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: 'Invalid body',
    }))
  }

  const [created] = await db.insert(diary).values({
    ...result.data,
    userId: event.context.user.id,
  }).returning()

  return created
})
