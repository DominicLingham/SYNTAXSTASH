<script lang="ts" setup>
// Provide the session data on SSR
const authStore = useAuthStore()
await authStore.init()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-zinc-800 dark:bg-background-dark dark:text-zinc-100">
    <AppNavBar />
    <UContainer class="flex-1 flex flex-col">
      <slot />
    </UContainer>
  </div>
</template>

<style>

</style>
