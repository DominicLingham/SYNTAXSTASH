<script lang="ts" setup>
import UserDropdown from '../auth/UserDropdown.vue'
import ThemeToggle from './ThemeToggle.vue'

const authStore = useAuthStore()
</script>

<template>
  <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/50 dark:border-zinc-800/50">
    <UContainer>
      <div class="flex justify-between items-center py-3">
        <NuxtLink
          to="/"
          class="flex items-center"
        >
          <img
            src="/SyntaxStashLogoFull.png"
            width="180px"
            class="dark:brightness-110"
          >
        </NuxtLink>

        <div class="flex items-center gap-3">
          <UButton
            v-if="!authStore.user"
            to="/login"
          >
            Get started
          </UButton>
          <UserDropdown />
          <ThemeToggle />
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<style>

</style>
