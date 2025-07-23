<script setup lang="ts">
import type { AnyExtension } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const props = defineProps<{
  modelValue: object
  readonly?: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const extensions: AnyExtension[] = [
  StarterKit,
]

const editor = useEditor({
  content: props.modelValue,
  extensions,
  editorProps: {
    attributes: {
      class: 'border border-primary p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto outline-none',
    },
  },
  editable: !props.readonly,
  onUpdate: ({ editor }) => {
    emits('update:modelValue', editor.getJSON())
  },
})

watch(() => props.modelValue, (val) => {
  const isSame = JSON.stringify(editor.value?.getJSON()) === JSON.stringify(val)

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(val)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div>
    <UCard>
      <section class="controls flex items-center flex-wrap gap-4 p-4 border-t border-l border-r border-primary ">
        <button
          :class="{ 'bg-primary text-white': editor?.isActive('bold') }"
          class="rounded-sm cursor-pointer p-1"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          Bold
        </button>
        <button
          :class="{ 'bg-primary text-white': editor?.isActive('bold') }"
          class="rounded-sm cursor-pointer p-1"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          Italic
        </button>
      </section>
      <EditorContent :editor="editor" />
    </UCard>
  </div>
</template>

<style scoped>

</style>
