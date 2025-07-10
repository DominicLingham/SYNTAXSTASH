import { createAuthClient } from 'better-auth/vue'

const authClient = createAuthClient()

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = authClient.useSession()

  const user = computed(() => session.value.data?.user)
  const loading = computed(() => session.value.isPending || session.value.isRefetching)

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
    loading,
    user,
    signInGithub,
    signOut,
  }
})
