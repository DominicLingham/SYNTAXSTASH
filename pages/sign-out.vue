<script lang="ts" setup>
const authStore = useAuthStore()

onMounted(() => {
  authStore.signOut()
  navigateTo('/')
})
</script>

<template>
  <div class="flex items-center justify-center py-20">
    <div class="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
      <UIcon name="i-lucide-loader-2" class="animate-spin" />
      <span>Signing out...</span>
    </div>
  </div>
</template>

<style>

</style>
