import { eq } from 'drizzle-orm'
import { db } from '~/lib/db/db'
import { user } from '~/lib/db/schema'
import { updateUserSchema } from '~/lib/zod-schemas'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const authUser = event.context.user

  const result = await readValidatedBody(event, updateUserSchema.safeParse)

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: 'Invalid body',
    }))
  }

  try {
    const [updatedUser] = await db.update(user)
      .set({
        name: result.data.name,
        image: result.data.image,
        bio: result.data.bio,
        updatedAt: new Date(),
      })
      .where(eq(user.id, authUser.id))
      .returning({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        updatedAt: user.updatedAt,
      })

    return updatedUser
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to update account',
    }))
  }
})
