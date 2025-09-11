import { fetchDiary } from '~/lib/db/queries/diary'
import { diaryQuerySchema } from '~/lib/zod-schemas'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const user = event.context.user

  const queryResult = await getValidatedQuery(event, diaryQuerySchema.safeParse)

  if (!queryResult.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid query parameters',
      data: queryResult.error.issues,
    }))
  }

  const { entries: includeEntries } = queryResult.data

  try {
    const result = await fetchDiary(user.id, includeEntries)

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
