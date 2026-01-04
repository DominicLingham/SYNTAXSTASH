<script lang="ts" setup>
const { data: account } = await useFetch<AccountDetails>('/api/account')
</script>

<template>
  <div class="flex-1 flex flex-col md:flex-row gap-6 py-6">
    <aside class="w-64 shrink-0 flex flex-col gap-6">
      <UCard class="border border-zinc-200 dark:border-zinc-800 shadow-sm" to="/dashboard/account">
        <template #header>
          <div class="flex flex-col gap-4">
            <ULink class="flex gap-4 items-center text-primary" to="/dashboard/account">
              <UAvatar
                :src="account?.image || undefined"
                :alt="account?.name"
                size="xl"
                class="ring-2 ring-zinc-200 dark:ring-zinc-700"
              />
              <div class="flex flex-col">
                <h2 class="font-semibold">
                  {{ account?.name }}
                </h2>
                <p class="text-muted text-xs">
                  @{{ account?.username }}
                </p>
              </div>
            </ULink>
            <div class="py-2">
              <p class="text-sm">
                {{ account?.bio }}
              </p>
            </div>
          </div>
        </template>
      </UCard>

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
