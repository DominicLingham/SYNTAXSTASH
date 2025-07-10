<script lang="ts" setup>
definePageMeta({
  layout: false,
})
const route = useRoute()

const error = route.query.error || 'An unknown error occured'
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-background dark:bg-background-dark">
    <div class="flex flex-col items-center gap-4">
      <ULink to="/" class="flex flex-col items-center max-w-1/3">
        <img src="/SyntaxStashLogo.png" width="150px">
      </ULink>
      <h1 class="text-3xl text-primary font-bold">
        Oh no! {{ error }}
      </h1>
      <ULink
        as="button"
        to="/"
        class="font-semibold"
      >
        Back to home
      </ULink>
    </div>
  </div>
</template>

<style>

</style>
