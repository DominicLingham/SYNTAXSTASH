<script lang="ts" setup>

</script>

<template>
  <UCard variant="subtle" class="h-screen w-full md:h-auto md:max-w-md p-4">
    <template #header>
      <div class="w-full flex justify-center">
        <ULink to="/" class="flex flex-col items-center max-w-1/3">
          <img src="/SyntaxStashLogo.png" width="150px">
          <img src="/SyntaxStashLogoText.png">
        </ULink>
      </div>
    </template>
    <div>
      <slot />
    </div>
    <div class="flex gap-1 justify-center mt-4">
      <slot name="action" />
    </div>
  </UCard>
</template>

<style>

</style>
