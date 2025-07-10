<script lang="ts" setup>
// Provide the session data on SSR
const authStore = useAuthStore()
await authStore.init()
</script>

<template>
  <div class="text-secondary flex min-h-screen flex-col bg-background dark:bg-background-dark dark:text-white">
    <AppNavBar />
    <main>
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style>

</style>
