<script lang="ts" setup>
import UserDropdown from '../auth/UserDropdown.vue'
import ThemeToggle from './ThemeToggle.vue'

const authStore = useAuthStore()
</script>

<template>
  <nav class="sticky top-0 z-10 backdrop-blur-md">
    <UContainer>
      <div class="flex justify-between items-center py-4">
        <div>
          <NuxtLink
            to="/"
            class="text-xl font-bold flex items-center md:text-3xl "
          >
            <img
              src="/SyntaxStashLogoFull.png"
              width="200px"
            >
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
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
