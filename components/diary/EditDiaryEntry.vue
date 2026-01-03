<script lang="ts" setup>
import type { ZodIssue } from 'zod'
import type { UpdateDiaryEntryType } from '~/lib/zod-schemas'
import { updateDiaryEntrySchema } from '~/lib/zod-schemas'

const props = defineProps<{
  entry: {
    id: string
    title: string
    content: object
  }
}>()

const emits = defineEmits(['update:entryUpdated'])

const isDrawerOpen = ref(false)
const isSubmitting = ref(false)
const errorMessages = ref<ZodIssue[]>([])

const internalState = ref<UpdateDiaryEntryType>({
  id: props.entry.id,
  title: props.entry.title as string,
  content: props.entry.content,
})

function onDrawerToggle(isOpen: boolean) {
  isDrawerOpen.value = isOpen
  if (!isOpen) {
    errorMessages.value = []
    setTimeout(() => {
      internalState.value = {
        id: props.entry.id,
        title: props.entry.title as string,
        content: props.entry.content,
      }
    }, 200)
  }
}

async function onSubmit() {
  isSubmitting.value = true
  errorMessages.value = []

  try {
    const result = updateDiaryEntrySchema.safeParse(internalState.value)

    if (!result.success) {
      errorMessages.value = result.error.issues
      return
    }

    const updated = await $fetch('/api/diary-entries', {
      method: 'PATCH',
      body: internalState.value,
    })

    emits('update:entryUpdated', updated)
    isDrawerOpen.value = false
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isSubmitting.value = false
  }
}

function fieldError(name: string) {
  const issue = errorMessages.value.find(e => e.path[0] === name)
  return issue?.message || ''
}

// Watch for prop changes to update internal state
watch(() => props.entry, (newEntry) => {
  if (!isDrawerOpen.value) {
    internalState.value = {
      id: newEntry.id,
      title: newEntry.title as string,
      content: newEntry.content,
    }
  }
}, { deep: true })
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
      icon="material-symbols:edit"
      variant="subtle"
    />
    <template #header>
      <UFormField
        :error="fieldError('title')"
        :ui="{ error: 'font-bold' }"
      >
        <UInput
          v-model="internalState.title"
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
              class="text-xs text-zinc-500 tabular-nums"
              aria-live="polite"
              role="status"
            >
              {{ internalState.title?.length || 0 }}/50
            </div>
          </template>
        </UInput>
      </UFormField>
    </template>
    <template #body>
      <AppTipTapEditor v-model="internalState.content" />
    </template>
    <template #footer>
      <UButton
        :loading="isSubmitting"
        :disabled="isSubmitting"
        @click="onSubmit"
      >
        Save
      </UButton>
    </template>
  </UDrawer>
</template>

<style>

</style>
