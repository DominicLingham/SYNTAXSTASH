import { db } from '~/lib/db/db'
import { diary, diaryEntry, InsertDiary } from '~/lib/db/schema'

import { defaultTipTapContent } from '~/utils'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
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
      statusMessage: 'Failed to create diary or entry',
    }))
  }
})
