<script lang="ts" setup>

</script>

<template>
  <div class="flex-1 flex flex-col md:flex-row">
    <div class="w-64 px-4 pb-4">
      <UCard>
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
          <ULink
            class="p-2 rounded-md hover:bg-elevated hover:translate-x-0.5 hover:border-primary-500 transition ease-linear"
            active-class="border-l-6 bg-elevated font-medium"
            to="/dashboard/resources"
          >
            Resources
          </ULink>
          <ULink
            class="p-2 rounded-md hover:bg-elevated hover:translate-x-0.5 hover:border-primary-500 transition ease-linear"
            active-class="border-l-6 bg-elevated font-medium"
            to="/dashboard/diary"
          >
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
