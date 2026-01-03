import { db } from '~/lib/db/db'
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  const query = getQuery(event)
  const username = (query.username as string)?.toLowerCase()

  if (!username || username.length < 3) {
    return { available: false, reason: 'Username too short' }
  }

  try {
    const existingUser = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.username, username),
      columns: { id: true },
    })

    return {
      available: !existingUser,
      reason: existingUser ? 'Username is already taken' : null,
    }
  }
  catch {
    return { available: false, reason: 'Unable to check availability' }
  }
})
