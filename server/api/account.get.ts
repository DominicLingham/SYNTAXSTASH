import { db } from '~/lib/db/db'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const authUser = event.context.user

  try {
    const userWithAccounts = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, authUser.id),
      with: {
        accounts: {
          columns: {
            providerId: true,
            createdAt: true,
          },
        },
      },
    })

    if (!userWithAccounts) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found',
      }))
    }

    return {
      id: userWithAccounts.id,
      name: userWithAccounts.name,
      username: userWithAccounts.username,
      bio: userWithAccounts.bio,
      email: userWithAccounts.email,
      emailVerified: userWithAccounts.emailVerified,
      image: userWithAccounts.image,
      createdAt: userWithAccounts.createdAt,
      connectedAccounts: userWithAccounts.accounts.map(acc => ({
        provider: acc.providerId,
        connectedAt: acc.createdAt,
      })),
    }
  }
  catch {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to get account details',
    }))
  }
})
