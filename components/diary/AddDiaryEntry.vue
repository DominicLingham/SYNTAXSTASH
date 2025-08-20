<script setup lang="ts">
import type { ZodIssue } from 'zod'
import type { AddDiaryEntryType } from '~/lib/zod-schemas'
import { defaultTipTapContent } from '#imports'
import { addDiaryEntrySchema } from '~/lib/zod-schemas'
import TipTapEditor from '../app/TipTapEditor.vue'

const emits = defineEmits(['update:diaryEntryCreated'])

const isDrawerOpen = ref(false)
const isSubmitting = ref<boolean>(false)
const errorMessages = ref<ZodIssue[]>([])

const state = ref<AddDiaryEntryType>({
  title: '',
  content: defaultTipTapContent,
})

function onDrawerToggle(isOpen: boolean) {
  isDrawerOpen.value = isOpen // update state
  if (!isOpen) {
    errorMessages.value = []
    setTimeout(() => {
      state.value.title = ''
      state.value.content = defaultTipTapContent
    }, 200)
  }
}

async function onSubmit() {
  isSubmitting.value = true
  try {
    const result = addDiaryEntrySchema.safeParse(state.value)

    if (!result.success) {
      errorMessages.value = result.error.issues
    }

    const inserted = await $fetch('/api/diary-entries', {
      method: 'post',
      body: state.value,
    })

    emits('update:diaryEntryCreated', inserted)
    isDrawerOpen.value = false
  }
  catch (e) {
    const error = e as Error
    console.error(error)
  }
  finally {
    isSubmitting.value = false
  }
}

function fieldError(name: string) {
  const issue = errorMessages.value.find(e => e.path[0] === name)
  return issue?.message || ''
}
</script>

<template>
  <UDrawer
    v-model:open="isDrawerOpen"
    inset
    handle-only
    should-scale-background
    set-background-color-on-scale
    :ui="{
      footer: 'flex justify-end items-end',
    }"
    @update:open="onDrawerToggle"
  >
    <UButton
      label="Add entry"
      icon="material-symbols:add"
      variant="subtle"
    />
    <template #header>
      <UFormField
        :error="fieldError('title')"
        :ui="{ error: 'font-bold' }"
      >
        <UInput
          v-model="state.title"
          variant="ghost"
          placeholder="Today's story..."
          :maxlength="50"
          :ui="{
            base: 'p-4 text-3xl font-bold text-primary hover:bg-transparent focus:bg-transparent',
          }"
          class="w-full"
        >
          <template #trailing>
            <div
              id="character-count"
              class="text-xs text-muted tabular-nums"
              aria-live="polite"
              role="status"
            >
              {{ state.title?.length }}/{{ 50 }}
            </div>
          </template>
        </UInput>
      </UFormField>
    </template>
    <template #body>
      <TipTapEditor v-model="state.content" />
    </template>
    <template #footer>
      <UButton @click="onSubmit">
        Save
      </UButton>
    </template>
  </UDrawer>
</template>

<style>

</style>
