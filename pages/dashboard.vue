<script lang="ts" setup>

</script>

<template>
  <div class="flex-1 flex flex-col md:flex-row">
    <div class="w-64 px-4 pb-4">
      <UCard class="border border-primary-500 dark:border-primary-800">
        <template #header>
          <div class="flex gap-2 items-center">
            <UIcon
              name="material-symbols:dashboard"
            />
            <h2 class="text-xl">
              Dashboard
            </h2>
          </div>
        </template>
        <div class="flex flex-col gap-4">
          <ULink to="/dashboard/resources">
            Resources
          </ULink>
          <ULink to="/dashboard/diary">
            Diary
          </ULink>
        </div>
      </UCard>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<style>

</style>
