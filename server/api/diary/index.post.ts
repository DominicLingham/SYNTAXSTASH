import { db } from '~/lib/db/db'
import { diary, diaryEntry } from '~/lib/db/schema'
import { addDiarySchema } from '~/lib/zod-schemas'
import { defaultTipTapContent } from '~/utils'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const user = event.context.user

  const result = await readValidatedBody(event, addDiarySchema.safeParse)

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: 'Invalid body',
    }))
  }

  try {
    const [diaryCreated] = await db.insert(diary).values({
      ...result.data,
      userId: user.id,
    }).returning()

    const [entryCreated] = await db.insert(diaryEntry).values({
      title: `${user.name} added their diary!`,
      content: defaultTipTapContent,
      diaryId: diaryCreated.id,
    }).returning()

    return {
      diary: diaryCreated,
      entry: entryCreated,
    }
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to create diary',
    }))
  }
})
