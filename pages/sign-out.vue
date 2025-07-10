<script lang="ts" setup>
const authStore = useAuthStore()

onMounted(() => {
  authStore.signOut()
  navigateTo('/')
})
</script>

<template>
  <div>
    Signing out...
  </div>
</template>

<style>

</style>
