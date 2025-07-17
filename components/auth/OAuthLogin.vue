<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col gap-2">
    <UButton
      icon="i-mdi:github"
      block
      :disabled="authStore.loading"
      :loading="authStore.loading"
      @click="authStore.signInGithub"
    >
      Login with GitHub
    </UButton>
    <UButton
      icon="i-mdi:google"
      block
      :disabled="authStore.loading"
      :loading="authStore.loading"
      @click="authStore.signInGoogle"
    >
      Login with Google
    </UButton>
  </div>
</template>

<style>

</style>
