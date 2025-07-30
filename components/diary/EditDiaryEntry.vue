<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'

const props = defineProps<{
  entry: any
}>()

const internalState = ref<TimelineItem>(props.entry)

function onDrawerToggle(isOpen: boolean) {
  if (!isOpen) {
    setTimeout(() => {
      internalState.value = { ...props.entry }
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
      label="Edit entry"
      icon="material-symbols:add"
      variant="subtle"
    />
    <template #header>
      <UInput
        v-model="internalState.title"
        variant="ghost" placeholder="Today's story..."
        :ui="{
          base: 'p-4 text-3xl font-bold text-primary hover:bg-transparent focus:bg-transparent',
        }"
        class="w-full"
      />
    </template>
    <template #body>
      <pre>{{ internalState }}</pre>
      <AppTipTapEditor v-model="internalState.content" />
    </template>
    <template #footer>
      <UButton>Save</UButton>
    </template>
  </UDrawer>
</template>

<style>

</style>
