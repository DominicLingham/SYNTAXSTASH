<script lang="ts" setup>
definePageMeta({
  layout: false,
})
const route = useRoute()

const error = route.query.error || 'An unknown error occured'
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
    <div class="flex flex-col items-center gap-6 p-8">
      <ULink to="/" class="flex flex-col items-center">
        <img src="/SyntaxStashLogo.png" width="120px" class="opacity-90">
      </ULink>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Oh no!
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400">
          {{ error }}
        </p>
      </div>
      <UButton
        to="/"
        variant="outline"
        color="primary"
      >
        Back to home
      </UButton>
    </div>
  </div>
</template>

<style>

</style>
