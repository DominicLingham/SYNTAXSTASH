<script lang="ts" setup>

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
