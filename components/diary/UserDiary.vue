<script lang="ts" setup>
import type { SelectDiaryWithEntries } from '~/lib/db/schema'
import { AppStaticRenderer, DiaryAddDiary } from '#components'

const { data: userDiary, refresh } = await useFetch<SelectDiaryWithEntries>('/api/diary')

const hasDiary = computed(() => userDiary.value)

const entries = computed(() => {
  return userDiary.value?.entries?.map(x => ({
    id: x.id,
    title: x.title,
    content: x.content,
    icon: 'i-lucide-check-circle',
  })) || []
})
</script>

<template>
  <div class="min-h-60 flex flex-col gap-4 p-4 rounded-md border-2 border-primary-500 dark:border-primary-800 bg-elevated">
    <template v-if="hasDiary">
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h1 class="text-4xl font-bold">
            {{ userDiary?.name }}
          </h1>
          <DiaryAddDiaryEntry />
        </div>
        <p>{{ userDiary?.description }}</p>
      </div>
      <UCard>
        <UTimeline
          :items="entries"
          reverse
          :ui="{
            indicator: 'bg-primary text-black',
            separator: 'bg-primary',
          }"
          class="w-[100%]"
        >
          <template #description="{ item }">
            <div class="w-full p-4">
              <div>
                <DiaryEditDiaryEntry :entry="item" />
              </div>
              <AppStaticRenderer
                :content="item.content"
              />
            </div>
          </template>
        </UTimeline>
      </UCard>
    </template>
    <template v-else>
      <div class="flex-1 flex flex-col items-center justify-center gap-4 w-full">
        <p>Nothing here yet....</p>
        <DiaryAddDiary @update:diary-created="refresh" />
      </div>
    </template>
  </div>
</template>

<style>

</style>
