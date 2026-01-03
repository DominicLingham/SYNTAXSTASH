<script lang="ts" setup>
import type { ZodIssue } from 'zod'
import type { UpdateUserType } from '~/lib/zod-schemas'
import { updateUserSchema } from '~/lib/zod-schemas'

const authStore = useAuthStore()

type AccountDetails = {
  id: string
  name: string
  username: string | null
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: string
  connectedAccounts: {
    provider: string
    connectedAt: string
  }[]
}

const { data: account, refresh } = await useFetch<AccountDetails>('/api/account')

const isEditing = ref(false)
const isSaving = ref(false)
const errorMessages = ref<ZodIssue[]>([])

const editForm = ref<UpdateUserType>({
  name: '',
  image: null,
})

// Provider display info
const providerInfo: Record<string, { name: string, icon: string, color: string }> = {
  github: { name: 'GitHub', icon: 'i-mdi:github', color: 'text-zinc-900 dark:text-white' },
  google: { name: 'Google', icon: 'i-mdi:google', color: 'text-red-500' },
}

function startEditing() {
  editForm.value = {
    name: account.value?.name || '',
    image: account.value?.image || null,
  }
  errorMessages.value = []
  isEditing.value = true
}

function cancelEditing() {
  isEditing.value = false
  errorMessages.value = []
}

async function saveChanges() {
  errorMessages.value = []

  const result = updateUserSchema.safeParse(editForm.value)
  if (!result.success) {
    errorMessages.value = result.error.issues
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/account', {
      method: 'PATCH',
      body: editForm.value,
    })

    // Update auth store for immediate UI update (navbar, etc.)
    authStore.updateUserData({
      name: editForm.value.name,
      image: editForm.value.image,
    })

    await refresh()
    isEditing.value = false
  }
  catch (e) {
    console.error('Failed to save changes:', e)
  }
  finally {
    isSaving.value = false
  }
}

function fieldError(name: string) {
  const issue = errorMessages.value.find(e => e.path[0] === name)
  return issue?.message || ''
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="py-6 max-w-2xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Account Details
      </h1>
      <UButton
        v-if="!isEditing"
        variant="subtle"
        icon="material-symbols:edit"
        @click="startEditing"
      >
        Edit Profile
      </UButton>
    </div>

    <div class="space-y-6">
      <!-- Profile Card -->
      <UCard class="border border-zinc-200 dark:border-zinc-800">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="mingcute:user-3-fill" class="text-xl text-primary" />
            <h2 class="text-lg font-semibold">
              Profile
            </h2>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Avatar and Basic Info -->
          <div class="flex items-center gap-4">
            <UAvatar
              :src="account?.image || undefined"
              :alt="account?.name"
              size="xl"
              class="ring-2 ring-zinc-200 dark:ring-zinc-700"
            />
            <div>
              <p class="font-medium text-zinc-900 dark:text-zinc-100 text-lg">
                {{ account?.name }}
              </p>
              <p class="text-primary font-mono">
                @{{ account?.username }}
              </p>
            </div>
          </div>

          <!-- Edit Form -->
          <div v-if="isEditing" class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <UFormField label="Display Name" :error="fieldError('name')">
              <UInput
                v-model="editForm.name"
                placeholder="Your display name"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Profile Image URL" :error="fieldError('image')">
              <UInput
                v-model="editForm.image"
                placeholder="https://example.com/avatar.jpg"
                class="w-full"
              />
              <template #hint>
                <span class="text-xs text-zinc-500">Leave empty to use your OAuth provider's avatar</span>
              </template>
            </UFormField>

            <div class="flex justify-end gap-3 pt-2">
              <UButton
                variant="ghost"
                color="neutral"
                :disabled="isSaving"
                @click="cancelEditing"
              >
                Cancel
              </UButton>
              <UButton
                :loading="isSaving"
                :disabled="isSaving"
                @click="saveChanges"
              >
                Save Changes
              </UButton>
            </div>
          </div>

          <!-- Display Mode -->
          <div v-else class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Username
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <p class="text-zinc-900 dark:text-zinc-100 font-mono">
                    @{{ account?.username }}
                  </p>
                  <UBadge
                    color="neutral"
                    variant="subtle"
                    size="xs"
                  >
                    Permanent
                  </UBadge>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Email
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <p class="text-zinc-900 dark:text-zinc-100">
                    {{ account?.email }}
                  </p>
                  <UBadge
                    v-if="account?.emailVerified"
                    color="success"
                    variant="subtle"
                    size="xs"
                  >
                    Verified
                  </UBadge>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Display Name
                </p>
                <p class="text-zinc-900 dark:text-zinc-100 mt-1">
                  {{ account?.name }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Member Since
                </p>
                <p class="text-zinc-900 dark:text-zinc-100 mt-1">
                  {{ account?.createdAt ? formatDate(account.createdAt) : '-' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Connected Accounts Card -->
      <UCard class="border border-zinc-200 dark:border-zinc-800">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="material-symbols:link" class="text-xl text-primary" />
            <h2 class="text-lg font-semibold">
              Connected Accounts
            </h2>
          </div>
        </template>

        <div class="space-y-3">
          <div
            v-for="connectedAccount in account?.connectedAccounts"
            :key="connectedAccount.provider"
            class="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
          >
            <div class="flex items-center gap-3">
              <UIcon
                :name="providerInfo[connectedAccount.provider]?.icon || 'material-symbols:account-circle'"
                class="text-2xl" :class="[providerInfo[connectedAccount.provider]?.color || 'text-zinc-500']"
              />
              <div>
                <p class="font-medium text-zinc-900 dark:text-zinc-100">
                  {{ providerInfo[connectedAccount.provider]?.name || connectedAccount.provider }}
                </p>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">
                  Connected {{ formatDate(connectedAccount.connectedAt) }}
                </p>
              </div>
            </div>
            <UBadge color="success" variant="subtle">
              Connected
            </UBadge>
          </div>

          <p
            v-if="!account?.connectedAccounts?.length"
            class="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4"
          >
            No connected accounts
          </p>
        </div>
      </UCard>

      <!-- Account Info Card -->
      <UCard class="border border-zinc-200 dark:border-zinc-800">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="material-symbols:info" class="text-xl text-primary" />
            <h2 class="text-lg font-semibold">
              Account Information
            </h2>
          </div>
        </template>

        <div class="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
          <p>
            Your <strong>username</strong> is permanent and cannot be changed once set.
            This is your unique identifier on SyntaxStash.
          </p>
          <p>
            Your <strong>display name</strong> and <strong>profile image</strong> can be updated at any time using the Edit Profile button.
          </p>
          <p>
            Your <strong>email address</strong> is managed through your connected OAuth provider (GitHub or Google).
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style>

</style>
