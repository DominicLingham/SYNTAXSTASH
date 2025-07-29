<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'
import { AppStaticRenderer, DiaryAddDiary } from '#components'

const hasDiary = true

const items = [
  {
    date: 'Apr 5, 2025',
    title: 'Testing & Deployment',
    content: '',
    icon: 'i-lucide-check-circle',
  },
  {
    date: 'Apr 5, 2025',
    title: 'Stuff',
    content: '',
    icon: 'i-lucide-check-circle',
  },
] satisfies TimelineItem[]
</script>

<template>
  <div class="min-h-60 flex flex-col gap-4 p-4 rounded-md border-2 border-primary-500 dark:border-primary-800 bg-elevated">
    <template v-if="hasDiary">
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h1>My Diary</h1>
          <DiaryAddDiaryEntry />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo maxime natus quasi, quis velit aliquid quod ipsum, vero unde exercitationem quae at ullam enim? Reprehenderit dolorum quisquam eius dolorem!</p>
      </div>
      <UCard>
        <UTimeline
          :items="items"
          reverse
          :ui="{
            indicator: 'bg-primary text-black',
            separator: 'bg-primary',
          }"
          class="w-[100%]"
        >
          <template #description>
            <div class="w-full p-4">
              <AppStaticRenderer />
            </div>
          </template>
        </UTimeline>
      </UCard>
    </template>
    <template v-else>
      <div class="flex-1 flex flex-col items-center justify-center gap-4 w-full">
        <p>Nothing here yet....</p>
        <DiaryAddDiary />
      </div>
    </template>
  </div>
</template>

<style>

</style>
