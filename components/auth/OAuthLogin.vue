<script lang="ts" setup>
import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

async function signIn() {
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
  })
}
</script>

<template>
  <div class="flex flex-col">
    <UButton icon="i-mdi:github" block @click="signIn">
      Log in with GitHub
    </UButton>
  </div>
</template>

<style>

</style>
