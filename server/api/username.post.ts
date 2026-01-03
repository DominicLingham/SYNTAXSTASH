import { eq } from 'drizzle-orm'
import { db } from '~/lib/db/db'
import { user } from '~/lib/db/schema'
import { setUsernameSchema } from '~/lib/zod-schemas'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const authUser = event.context.user

  const result = await readValidatedBody(event, setUsernameSchema.safeParse)

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: result.error.issues[0]?.message || 'Invalid username',
    }))
  }

  const username = result.data.username.toLowerCase()

  try {
    // Check if user already has a username set
    const currentUser = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.id, authUser.id),
      columns: { username: true },
    })

    if (currentUser?.username) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Username has already been set and cannot be changed',
      }))
    }

    // Check if username is already taken
    const existingUser = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.username, username),
      columns: { id: true },
    })

    if (existingUser) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'This username is already taken',
      }))
    }

    // Set the username
    const [updatedUser] = await db.update(user)
      .set({
        username,
        updatedAt: new Date(),
      })
      .where(eq(user.id, authUser.id))
      .returning({
        id: user.id,
        username: user.username,
      })

    return { success: true, username: updatedUser.username }
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to set username',
    }))
  }
})
