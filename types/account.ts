export type AccountDetails = {
  id: string
  name: string
  username: string | null
  bio: string | null
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: string
  connectedAccounts: {
    provider: string
    connectedAt: string
  }[]
}
