<script lang="ts" setup>

</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
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
