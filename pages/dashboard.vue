<script lang="ts" setup>

</script>

<template>
  <div class="flex-1 flex flex-col md:flex-row gap-6 py-6">
    <aside class="w-64 shrink-0">
      <UCard class="border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <template #header>
          <div class="flex gap-2 items-center text-primary">
            <UIcon
              name="material-symbols:dashboard"
              class="text-xl"
            />
            <h2 class="text-lg font-semibold">
              Dashboard
            </h2>
          </div>
        </template>
        <nav class="flex flex-col gap-3">
          <ULink
            to="/dashboard/resources"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary transition-colors"
          >
            <UIcon name="material-symbols:folder" />
            Resources
          </ULink>
          <ULink
            to="/dashboard/diary"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary transition-colors"
          >
            <UIcon name="mingcute:diary-fill" />
            Diary
          </ULink>
        </nav>
      </UCard>
    </aside>
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>

<style>

</style>
