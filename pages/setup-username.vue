<script lang="ts" setup>
import type { SetUsernameType } from '~/lib/zod-schemas'
import { setUsernameSchema } from '~/lib/zod-schemas'

definePageMeta({
  layout: false,
})

const router = useRouter()

const form = ref<SetUsernameType>({
  username: '',
})

const isSubmitting = ref(false)
const isChecking = ref(false)
const errorMessage = ref('')
const availabilityMessage = ref('')
const isAvailable = ref<boolean | null>(null)

// Debounced username availability check
const checkAvailability = useDebounceFn(async (username: string) => {
  if (username.length < 3) {
    isAvailable.value = null
    availabilityMessage.value = ''
    return
  }

  // Validate format first
  const result = setUsernameSchema.safeParse({ username })
  if (!result.success) {
    isAvailable.value = false
    availabilityMessage.value = result.error.issues[0]?.message || 'Invalid username'
    return
  }

  isChecking.value = true
  try {
    const response = await $fetch<{ available: boolean, reason: string | null }>('/api/username/check', {
      query: { username },
    })
    isAvailable.value = response.available
    availabilityMessage.value = response.available ? 'Username is available' : (response.reason || 'Username is taken')
  }
  catch {
    isAvailable.value = null
    availabilityMessage.value = 'Unable to check availability'
  }
  finally {
    isChecking.value = false
  }
}, 400)

watch(() => form.value.username, (newVal) => {
  errorMessage.value = ''
  if (newVal) {
    checkAvailability(newVal.toLowerCase())
  }
  else {
    isAvailable.value = null
    availabilityMessage.value = ''
  }
})

async function onSubmit() {
  errorMessage.value = ''

  const result = setUsernameSchema.safeParse(form.value)
  if (!result.success) {
    errorMessage.value = result.error.issues[0]?.message || 'Invalid username'
    return
  }

  if (!isAvailable.value) {
    errorMessage.value = 'Please choose an available username'
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/username', {
      method: 'POST',
      body: { username: form.value.username.toLowerCase() },
    })
    router.push('/dashboard')
  }
  catch (e: any) {
    errorMessage.value = e.data?.message || 'Failed to set username'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
    <UCard class="w-full max-w-md border border-zinc-200 dark:border-zinc-800">
      <template #header>
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <img src="/SyntaxStashLogo.png" width="80" class="opacity-90">
          </div>
          <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Choose your username
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            This will be your unique identifier on SyntaxStash
          </p>
        </div>
      </template>

      <div class="space-y-6">
        <UFormField
          label="Username"
          :error="errorMessage"
        >
          <UInput
            v-model="form.username"
            placeholder="e.g. coder_jane"
            class="w-full"
            :color="isAvailable === true ? 'success' : isAvailable === false ? 'error' : undefined"
          >
            <template #leading>
              <span class="text-zinc-400">@</span>
            </template>
            <template #trailing>
              <UIcon
                v-if="isChecking"
                name="i-lucide-loader-2"
                class="animate-spin text-zinc-400"
              />
              <UIcon
                v-else-if="isAvailable === true"
                name="i-lucide-check"
                class="text-green-500"
              />
              <UIcon
                v-else-if="isAvailable === false"
                name="i-lucide-x"
                class="text-red-500"
              />
            </template>
          </UInput>
          <template #hint>
            <span
              v-if="availabilityMessage && !errorMessage"
              :class="isAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ availabilityMessage }}
            </span>
          </template>
        </UFormField>

        <div class="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4">
          <h3 class="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Username rules:
          </h3>
          <ul class="text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
            <li class="flex items-center gap-2">
              <UIcon
                :name="form.username.length >= 3 ? 'i-lucide-check' : 'i-lucide-circle'"
                :class="form.username.length >= 3 ? 'text-green-500' : 'text-zinc-400'"
                class="text-xs"
              />
              3-20 characters long
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                :name="/^[a-zA-Z]/.test(form.username) ? 'i-lucide-check' : 'i-lucide-circle'"
                :class="/^[a-zA-Z]/.test(form.username) ? 'text-green-500' : 'text-zinc-400'"
                class="text-xs"
              />
              Starts with a letter
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                :name="/^[a-zA-Z0-9_]*$/.test(form.username) && form.username.length > 0 ? 'i-lucide-check' : 'i-lucide-circle'"
                :class="/^[a-zA-Z0-9_]*$/.test(form.username) && form.username.length > 0 ? 'text-green-500' : 'text-zinc-400'"
                class="text-xs"
              />
              Only letters, numbers, and underscores
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-alert-circle" class="text-amber-500 text-xs" />
              <span class="text-amber-600 dark:text-amber-400">Cannot be changed once set</span>
            </li>
          </ul>
        </div>

        <UButton
          block
          size="lg"
          :loading="isSubmitting"
          :disabled="isSubmitting || !isAvailable"
          @click="onSubmit"
        >
          Continue
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<style>

</style>
