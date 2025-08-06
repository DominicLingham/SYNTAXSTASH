<script setup lang="ts">
import type { AddDiaryEntryType } from '~/lib/zod-schemas'
import { defaultTipTapContent } from '#imports'
import TipTapEditor from '../app/TipTapEditor.vue'

const state = ref<AddDiaryEntryType>({
  title: '',
  content: defaultTipTapContent,
})

function onDrawerToggle(isOpen: boolean) {
  if (!isOpen) {
    setTimeout(() => {
      state.value.title = ''
      state.value.content = defaultTipTapContent
    }, 200)
  }
}
</script>

<template>
  <UDrawer
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
      <UInput
        v-model="state.title"
        variant="ghost" placeholder="Today's story..."
        :ui="{
          base: 'p-4 text-3xl font-bold text-primary hover:bg-transparent focus:bg-transparent',
        }"
        class="w-full"
      />
    </template>
    <template #body>
      <pre>{{ state }}</pre>
      <TipTapEditor v-model="state.content" />
    </template>
    <template #footer>
      <UButton>Save</UButton>
    </template>
  </UDrawer>
</template>

<style>

</style>
