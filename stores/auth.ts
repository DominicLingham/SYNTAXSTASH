import { createAuthClient } from 'better-auth/vue'

const authClient = createAuthClient()

export const useAuthStore = defineStore('useAuthStore', () => {
  // Session state to be updated on init
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null> (null)

  // Initialize the auth session state from server side
  async function init() {
    const data = await authClient.useSession(useFetch)
    session.value = data
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

  async function signOut() {
    await authClient.signOut()
  }

  return {
    init,
    loading,
    user,
    signInGithub,
    signOut,
  }
})
