import type { SelectDiaryWithEntries } from '~/lib/db/schema'
import { db } from '~/lib/db/db'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const user = event.context.user

  try {
    const result: SelectDiaryWithEntries | undefined = await db.query.diary.findFirst({
      where: (diary, { eq }) => eq(diary.userId, user.id),
      with: {
        entries: {
          where: (entry, { isNull }) => isNull(entry.deletedAt),
        },
      },
    })

    if (!result) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unable to find diary for user',
      }))
    }

    return result
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to get diary',
    }))
  }
})
