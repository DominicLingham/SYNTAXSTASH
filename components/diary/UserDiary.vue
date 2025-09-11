<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'
import { AppStaticRenderer, DiaryAddDiaryEntry, DiaryEditDiaryEntry } from '#components'
import { useDiaryStore } from '~/stores/diary'
import { hasJsonContent } from '~/utils'

const diaryStore = useDiaryStore()

const { userDiary } = storeToRefs(diaryStore)

// Check if the user has a diary
const hasDiary = computed(() => !!userDiary.value)

// Map diary entries into TimelineItem objects, newest first
const timelineItems = computed<TimelineItem[]>(() => {
  return userDiary.value?.entries
    ?.slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(entry => ({
      id: entry.id,
      title: entry.title,
      icon: 'mingcute:diary-fill',
      date: entry.createdAt ? new Date(entry.createdAt).toISOString() : undefined,
      content: entry.content,
    })) || []
})
</script>

<template>
  <div class="min-h-60 flex flex-col gap-4 p-4 rounded-md">
    <template v-if="hasDiary">
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h1 class="text-4xl font-bold">
            {{ userDiary?.name }}
          </h1>
          <DiaryAddDiaryEntry @update:diary-entry-created="diaryStore.refreshUserDiary" />
        </div>
        <p>{{ userDiary?.description }}</p>
      </div>

      <UCard class="border-l-4 border-primary-500 rounded-2xl outline-offset-4 pl-4">
        <UTimeline
          :items="timelineItems"
          :ui="{
            indicator: 'bg-primary text-black',
            separator: 'bg-primary',
          }"
          class="w-full"
        >
          <template #title="{ item }">
            <div class="flex justify-between items-center">
              <div class="text-xl">
                {{ item.title }}
              </div>
              <div class="flex gap-2">
                <DiaryEditDiaryEntry :entry="item" />
                <DiaryRemoveDiaryEntry
                  :entry-id="item.id"
                  @update:diary-entry-removed="diaryStore.refreshUserDiary"
                />
              </div>
            </div>
          </template>

          <template #description="{ item }">
            <div v-if="hasJsonContent(item.content)" class="w-full py-4 flex flex-col gap-4">
              <AppStaticRenderer :content="item.content" />
            </div>
          </template>

          <template #date="{ item }">
            {{ item.date ? new Date(item.date) : '' }}
          </template>
        </UTimeline>
      </UCard>
    </template>

    <template v-else>
      <div class="flex-1 flex flex-col items-center justify-center gap-4 w-full">
        <p>Nothing here yet....</p>
        <DiaryAddDiary @update:diary-created="diaryStore.refreshUserDiary" />
      </div>
    </template>
  </div>
</template>

<style scoped>
/* optional styling for timeline spacing or cards */
</style>
