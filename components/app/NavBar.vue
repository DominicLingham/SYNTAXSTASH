<script lang="ts" setup>
import ThemeToggle from './ThemeToggle.vue'
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
          <UButton to="/login">
            Get started
          </UButton>
          <ThemeToggle />
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<style>

</style>
