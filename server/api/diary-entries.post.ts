import type { SelectDiary } from '~/lib/db/schema'
import { db } from '~/lib/db/db'
import { diaryEntry } from '~/lib/db/schema'
import { addDiaryEntrySchema } from '~/lib/zod-schemas'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const user = event.context.user

  const result = await readValidatedBody(event, addDiaryEntrySchema.safeParse)

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: 'Invalid body',
    }))
  }

  try {
    const diary: SelectDiary | undefined = await db.query.diary.findFirst({
      where: (diary, { eq }) => eq(diary.userId, user.id),
    })

    if (!diary) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unable to find diary for user',
      }))
    }

    const [entryCreated] = await db.insert(diaryEntry).values({
      title: result.data.title,
      content: result.data.content,
      diaryId: diary.id,
    }).returning()

    return entryCreated
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to create diary entry',
    }))
  }
})
