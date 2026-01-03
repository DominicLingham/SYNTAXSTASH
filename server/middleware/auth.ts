import { auth } from '~/lib/auth'
import { db } from '~/lib/db/db'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })
  event.context.user = session?.user

  // Protect dashboard routes
  if (event.path.startsWith('/dashboard')) {
    if (!session?.user) {
      return sendRedirect(event, '/login', 302)
    }

    // Check if user has a username set
    const userWithUsername = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.id, session.user.id),
      columns: { username: true },
    })

    if (!userWithUsername?.username) {
      return sendRedirect(event, '/setup-username', 302)
    }
  }

  // Protect setup-username page - must be logged in
  if (event.path === '/setup-username') {
    if (!session?.user) {
      return sendRedirect(event, '/login', 302)
    }

    // If user already has username, redirect to dashboard
    const userWithUsername = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.id, session.user.id),
      columns: { username: true },
    })

    if (userWithUsername?.username) {
      return sendRedirect(event, '/dashboard', 302)
    }
  }
})
