<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col">
    <UButton
      icon="i-mdi:github"
      block
      :disabled="authStore.loading"
      :loading="authStore.loading"
      @click="authStore.signInGithub"
    >
      Login with GitHub
    </UButton>
  </div>
</template>

<style>

</style>
