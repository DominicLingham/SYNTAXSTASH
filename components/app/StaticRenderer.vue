<script lang="ts" setup>
import type { JSONContent } from '@tiptap/vue-3'
import { defaultTipTapContent } from '#imports'
import StarterKit from '@tiptap/starter-kit'
import { renderToHTMLString } from '@tiptap/static-renderer'

const props = defineProps<{
  content: JSONContent
}>()

const renderedContent = computed(() => {
  return renderToHTMLString({
    extensions: [StarterKit],
    content: props.content ?? defaultTipTapContent,
  })
})
</script>

<template>
  <UCard>
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <div
      class="prose prose-lg dark:prose-invert max-w-none"
      v-html="renderedContent"
    />
    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </UCard>
</template>

<style>

</style>
