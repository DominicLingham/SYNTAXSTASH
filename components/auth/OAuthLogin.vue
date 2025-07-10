<script lang="ts" setup>
import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

const loading = ref(false)

async function signIn() {
  loading.value = true
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
  })
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <UButton
      icon="i-mdi:github"
      block
      :disabled="loading"
      :loading="loading"
      @click="signIn"
    >
      Log in with GitHub
    </UButton>
  </div>
</template>

<style>

</style>
