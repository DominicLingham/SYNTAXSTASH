import { eq } from 'drizzle-orm'
import { db } from '~/lib/db/db'
import { diaryEntry } from '~/lib/db/schema'
import { deleteDiaryEntrySchema } from '~/lib/zod-schemas'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const result = deleteDiaryEntrySchema.safeParse({ entryId: idParam })

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid query parameters',
      data: result.error.issues,
    }))
  }

  const [removed] = await db.delete(diaryEntry)
    .where(eq(diaryEntry.id, result.data.entryId))
    .returning()

  if (!removed) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Diary entry not found.',
    })
  }

  setResponseStatus(event, 204)
})
