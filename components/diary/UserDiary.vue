<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'
import type { SelectDiaryWithEntries } from '~/lib/db/schema'
import { AppStaticRenderer, DiaryAddDiaryEntry, DiaryEditDiaryEntry } from '#components'

const { data: userDiary, refresh } = await useFetch<SelectDiaryWithEntries>('/api/diary')

// Check if the user has a diary
const hasDiary = computed(() => !!userDiary.value)

// Delete confirmation state
const isDeleteModalOpen = ref(false)
const entryToDelete = ref<{ id: string, title: string } | null>(null)
const isDeleting = ref(false)

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

// Check if the JSON content is not empty
function hasJsonContent(content: any): boolean {
  if (!content || !Array.isArray(content.content))
    return false
  return content.content.some((node: any) => {
    if (node.type === 'paragraph') {
      return node.content?.some((child: any) => !!child.text?.trim())
    }
    return true
  })
}

// Format date as "Wed Aug 20 16:45"
function formatDate(dateString: string | undefined): string {
  if (!dateString)
    return ''
  const date = new Date(dateString)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = days[date.getDay()]
  const month = months[date.getMonth()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day} ${month} ${dayOfMonth} ${year} ${hours}:${minutes}`
}

// Open delete confirmation modal
function confirmDelete(item: { id: string, title: string }) {
  entryToDelete.value = { id: item.id, title: item.title as string }
  isDeleteModalOpen.value = true
}

// Handle delete
async function handleDelete() {
  if (!entryToDelete.value)
    return

  isDeleting.value = true
  try {
    await $fetch('/api/diary-entries', {
      method: 'DELETE',
      body: { id: entryToDelete.value.id },
    })
    isDeleteModalOpen.value = false
    entryToDelete.value = null
    await refresh()
  }
  catch (e) {
    console.error('Failed to delete entry:', e)
  }
  finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="min-h-60 flex flex-col gap-4 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm">
    <template v-if="hasDiary">
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h1 class="text-4xl font-bold">
            {{ userDiary?.name }}
          </h1>
          <DiaryAddDiaryEntry @update:diary-entry-created="refresh" />
        </div>
        <p>{{ userDiary?.description }}</p>
      </div>

      <UCard>
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
                <DiaryEditDiaryEntry :entry="item" @update:entry-updated="refresh" />
                <UButton
                  icon="material-symbols:delete"
                  variant="subtle"
                  color="error"
                  @click="confirmDelete(item)"
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
            {{ formatDate(item.date) }}
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

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="isDeleteModalOpen">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30">
                <UIcon name="material-symbols:delete" class="text-xl text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Delete Entry
                </h3>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </template>

          <p class="text-zinc-600 dark:text-zinc-300">
            Are you sure you want to delete "<span class="font-medium">{{ entryToDelete?.title }}</span>"?
          </p>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton
                variant="ghost"
                color="neutral"
                :disabled="isDeleting"
                @click="isDeleteModalOpen = false"
              >
                Cancel
              </UButton>
              <UButton
                color="error"
                :loading="isDeleting"
                :disabled="isDeleting"
                @click="handleDelete"
              >
                Delete
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
/* optional styling for timeline spacing or cards */
</style>
