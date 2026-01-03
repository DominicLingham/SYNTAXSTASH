import type { SelectDiary } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '~/lib/db/db'
import { diaryEntry } from '~/lib/db/schema'
import { deleteDiaryEntrySchema } from '~/lib/zod-schemas'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const user = event.context.user

  const result = await readValidatedBody(event, deleteDiaryEntrySchema.safeParse)

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: 'Invalid body',
    }))
  }

  try {
    // Verify user owns the diary that contains this entry
    const diary: SelectDiary | undefined = await db.query.diary.findFirst({
      where: (diary, { eq }) => eq(diary.userId, user.id),
    })

    if (!diary) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unable to find diary for user',
      }))
    }

    // Verify the entry belongs to user's diary
    const existingEntry = await db.query.diaryEntry.findFirst({
      where: (entry, { eq, and, isNull }) => and(
        eq(entry.id, result.data.id),
        eq(entry.diaryId, diary.id),
        isNull(entry.deletedAt),
      ),
    })

    if (!existingEntry) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'Diary entry not found',
      }))
    }

    // Soft delete by setting deletedAt
    const [deletedEntry] = await db.update(diaryEntry)
      .set({
        deletedAt: Date.now(),
      })
      .where(eq(diaryEntry.id, result.data.id))
      .returning()

    return { success: true, id: deletedEntry.id }
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to delete diary entry',
    }))
  }
})
