<script setup lang="ts">
import type { AnyExtension } from '@tiptap/vue-3'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'

const props = defineProps<{
  modelValue: object
  readonly?: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const lowlight = createLowlight(all)

// Register common languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('javascript', js)
lowlight.register('typescript', ts)
lowlight.register('json', json)
lowlight.register('python', python)
lowlight.register('py', python)

const extensions: AnyExtension[] = [
  StarterKit,
  Underline,
  CodeBlockLowlight.configure({
    lowlight,
  }),
]

const editor = useEditor({
  content: props.modelValue,
  extensions,
  editorProps: {
    attributes: {
      class: 'prose prose-sm dark:prose-invert max-w-none bg-elevated border-2 border-gray-300 p-4 min-h-[12rem] max-h-[24rem] rounded-md overflow-y-auto outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-gray-400',
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

// Language selector functions
function getCurrentLanguage() {
  if (!editor.value?.isActive('codeBlock'))
    return 'text'
  const attrs = editor.value.getAttributes('codeBlock')
  return attrs.language || 'text'
}

function setLanguage(language: string) {
  if (editor.value?.isActive('codeBlock')) {
    editor.value.chain().focus().setCodeBlock({ language }).run()
  }
}

function getCurrentLanguageLabel() {
  const language = getCurrentLanguage()
  switch (language) {
    case 'javascript':
      return 'JavaScript'
    case 'typescript':
      return 'TypeScript'
    case 'html':
      return 'HTML'
    case 'css':
      return 'CSS'
    case 'json':
      return 'JSON'
    case 'python':
      return 'Python'
    default:
      return 'Plain Text'
  }
}

const languageOptions = [
  {
    label: 'Plain Text',
    value: 'text',
    onSelect: () => setLanguage('text'),
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    onSelect: () => setLanguage('javascript'),
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    onSelect: () => setLanguage('typescript'),
  },
  {
    label: 'HTML',
    value: 'html',
    onSelect: () => setLanguage('html'),
  },
  {
    label: 'CSS',
    value: 'css',
    onSelect: () => setLanguage('css'),
  },
  {
    label: 'JSON',
    value: 'json',
    onSelect: () => setLanguage('json'),
  },
  {
    label: 'Python',
    value: 'python',
    onSelect: () => setLanguage('python'),
  },
]
</script>

<template>
  <div>
    <UCard variant="outline">
      <template #header>
        <section
          v-if="editor"
          class="controls flex items-center flex-wrap gap-4"
        >
          <UButton
            variant="ghost"
            :class="{ 'bg-primary': editor?.isActive('bold') }"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            icon="tabler:bold"
            @click="editor.chain().focus().toggleBold().run()"
          />
          <UButton
            variant="ghost"
            :class="{ 'bg-primary': editor?.isActive('italic') }"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            icon="tabler:italic"
            @click="editor.chain().focus().toggleItalic().run()"
          />
          <UButton
            variant="ghost"
            icon="tabler:underline"
            :class="{ 'bg-primary': editor?.isActive('underline') }"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            @click="editor.chain().focus().toggleUnderline().run()"
          />
          <UButton
            variant="ghost"
            label="h1"
            :class="{ 'bg-primary': editor?.isActive('heading', { level: 1 }) }"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          />
          <UButton
            variant="ghost"
            label="h2"
            :class="{ 'bg-primary': editor?.isActive('heading', { level: 2 }) }"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          />
          <UButton
            variant="ghost"
            label="h3"
            :class="{ 'bg-primary': editor?.isActive('heading', { level: 3 }) }"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          />
          <UButton
            variant="ghost"
            label="Undo"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            :disabled="!editor?.can().chain().focus().undo().run()"
            @click="editor.chain().focus().undo().run()"
          />
          <UButton
            variant="ghost"
            label="Redo"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            :disabled="!editor?.can().chain().focus().redo().run()"
            @click="editor.chain().focus().redo().run()"
          />
          <UButton
            variant="ghost"
            icon="tabler:list"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            :class="{ 'bg-primary': editor?.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          />
          <UButton
            variant="ghost"
            icon="tabler:list-numbers"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            :class="{ 'bg-primary': editor?.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
          />

          <UButton
            variant="ghost"
            icon="codicon:horizontal-rule"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            :class="{ 'bg-primary': editor?.isActive('horizontalRule') }"
            @click="editor.chain().focus().setHorizontalRule().run()"
          />

          <UButton
            variant="ghost"
            icon="tabler:code"
            class="rounded-sm cursor-pointer p-1 text-gray-900 dark:text-white hover:text-primary"
            :class="{ 'bg-primary': editor?.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
          />

          <!-- Language selector for code blocks -->
          <UDropdownMenu
            v-if="editor?.isActive('codeBlock')"
            :items="languageOptions"
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 8,
            }"
            :ui="{
              content: 'w-48',
            }"
            color="primary"
          >
            <UButton
              variant="ghost"
              size="sm"
              :label="getCurrentLanguageLabel()"
              icon="i-lucide-chevron-down"
              class="w-32 justify-between"
            />
          </UDropdownMenu>
        </section>
      </template>
      <EditorContent :editor="editor" />
    </UCard>
  </div>
</template>

<style lang="scss">
/* Dark mode styles for hr */
.dark .tiptap hr {
  border-top-color: #4b5563;

  &:hover {
    border-top-color: #6b7280;
  }

  &.ProseMirror-selectednode {
    border-top-color: #34d399;
  }
}

/* Override Tailwind Typography styles for code blocks */
.prose pre {
  background-color: #1e1e1e !important;
  color: #d4d4d4 !important;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 0 !important;
}

.prose pre code {
  background: none !important;
  padding: 0 !important;
  color: inherit !important;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Dark mode adjustments */
.dark .prose pre {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}

/* Syntax highlighting styles */
.hljs {
  background: transparent !important;
  color: #d4d4d4;
  font-family: 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.hljs-comment,
.hljs-quote {
  color: #6a9955;
  font-style: italic;
}

.hljs-variable,
.hljs-template-variable,
.hljs-attribute,
.hljs-tag,
.hljs-name,
.hljs-regexp,
.hljs-link,
.hljs-selector-id,
.hljs-selector-class {
  color: #9cdcfe;
}

.hljs-number,
.hljs-meta,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params {
  color: #b5cea8;
}

.hljs-string,
.hljs-symbol,
.hljs-bullet {
  color: #ce9178;
}

.hljs-title,
.hljs-section {
  color: #dcdcaa;
}

.hljs-keyword,
.hljs-selector-tag {
  color: #569cd6;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: 700;
}

/* Dark mode syntax highlighting */
.dark .hljs {
  color: #e5e5e5;
}

.dark .hljs-comment,
.dark .hljs-quote {
  color: #6a9955;
}

.dark .hljs-variable,
.dark .hljs-template-variable,
.dark .hljs-attribute,
.dark .hljs-tag,
.dark .hljs-name,
.dark .hljs-regexp,
.dark .hljs-link,
.dark .hljs-selector-id,
.dark .hljs-selector-class {
  color: #9cdcfe;
}

.dark .hljs-number,
.dark .hljs-meta,
.dark .hljs-built_in,
.dark .hljs-builtin-name,
.dark .hljs-literal,
.dark .hljs-type,
.dark .hljs-params {
  color: #b5cea8;
}

.dark .hljs-string,
.dark .hljs-symbol,
.dark .hljs-bullet {
  color: #ce9178;
}

.dark .hljs-title,
.dark .hljs-section {
  color: #dcdcaa;
}

.dark .hljs-keyword,
.dark .hljs-selector-tag {
  color: #569cd6;
}
</style>
