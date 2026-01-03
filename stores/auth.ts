import { createAuthClient } from 'better-auth/vue'

const authClient = createAuthClient()

export const useAuthStore = defineStore('useAuthStore', () => {
  // Session state to be updated on init
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null)

  // Initialize the auth session state from server side
  async function init() {
    const data = await authClient.useSession(useFetch)
    session.value = data
  }

  // Refresh session data from server
  async function refreshSession() {
    const data = await authClient.useSession(useFetch)
    session.value = data
  }

  // Update user data locally for immediate UI updates
  function updateUserData(updates: { name?: string, image?: string | null }) {
    if (session.value?.data?.user) {
      // Create new references to trigger Vue reactivity
      const updatedUser = {
        ...session.value.data.user,
        ...updates,
      }
      const updatedData = {
        ...session.value.data,
        user: updatedUser,
      }
      session.value = {
        ...session.value,
        data: updatedData,
      }
    }
  }

  const user = computed(() => session.value?.data?.user)
  const loading = computed(() => session.value?.isPending)

  async function signInGithub() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    })
  }

  async function signInGoogle() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    })
  }

  async function signOut() {
    await authClient.signOut()
  }

  return {
    init,
    refreshSession,
    updateUserData,
    loading,
    user,
    signInGithub,
    signInGoogle,
    signOut,
  }
})
