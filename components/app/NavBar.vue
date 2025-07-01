<script lang="ts" setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <nav>
    <UContainer>
      <div class="flex justify-between items-center py-4">
        <div>
          <NuxtLink
            to="/"
            class="text-xl font-bold flex items-center md:text-3xl "
          >
            <img
              src="/SyntaxStashLogo-dark.svg"
              height="50px"
              width="70px"
            >
            <span>SyntaxStash</span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <ThemeToggle />
          <UButton>Get started</UButton>
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<style>

</style>
