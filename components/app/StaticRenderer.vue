<script lang="ts" setup>
import type { JSONContent } from '@tiptap/vue-3'
import { defaultTipTapContent } from '#imports'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { renderToHTMLString } from '@tiptap/static-renderer'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'

const props = defineProps<{
  content: JSONContent
  fallbackContent?: JSONContent
}>()

// Set up lowlight for syntax highlighting
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
lowlight.register('jsx', js)
lowlight.register('vue', html)
lowlight.register('scss', css)
lowlight.register('sql', sql)

// All extensions that match the editor
const extensions = [
  StarterKit,
  Underline,
  CodeBlockLowlight.configure({
    lowlight,
  }),
]

const renderedContent = computed(() => {
  try {
    // Validate content structure
    const contentToRender = props.content
      && typeof props.content === 'object'
      && 'type' in props.content
      ? props.content
      : (props.fallbackContent || defaultTipTapContent)

    // Ensure content has proper structure
    if (!contentToRender.content || !Array.isArray(contentToRender.content)) {
      return '<p>No content available</p>'
    }

    return renderToHTMLString({
      extensions,
      content: contentToRender,
    })
  }
  catch (error) {
    console.error('Error rendering TipTap content:', error)
    return '<p>Error rendering content</p>'
  }
})

// Check if content is empty or invalid
const hasContent = computed(() => {
  if (!props.content) {
    return false
  }

  try {
    return props.content.content
      && Array.isArray(props.content.content)
      && props.content.content.length > 0
      && props.content.content.some(node =>
        node.type === 'paragraph'
        && node.content
        && Array.isArray(node.content)
        && node.content.length > 0,
      )
  }
  catch {
    return false
  }
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
      v-if="hasContent"
      class="prose prose-lg dark:prose-invert max-w-none"
      v-html="renderedContent"
    />

    <div
      v-else
      class="prose prose-lg dark:prose-invert max-w-none text-muted-foreground italic"
    >
      <p>No content to display</p>
    </div>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </UCard>
</template>

<style>
/* Ensure code blocks are properly styled */
.prose pre {
  background-color: hsl(var(--muted));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.prose pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.prose code {
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

/* Ensure underline text is visible */
.prose u {
  text-decoration: underline;
  text-decoration-color: hsl(var(--foreground));
  text-decoration-thickness: 2px;
}

/* Better list styling */
.prose ul, .prose ol {
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.5rem 0;
}

/* Better blockquote styling */
.prose blockquote {
  border-left: 4px solid hsl(var(--primary));
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: hsl(var(--muted-foreground));
}

/* Better table styling */
.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose th, .prose td {
  border: 1px solid hsl(var(--border));
  padding: 0.5rem;
  text-align: left;
}

.prose th {
  background-color: hsl(var(--muted));
  font-weight: 600;
}

/* Better horizontal rule styling */
.prose hr {
  border: none;
  border-top: 2px solid hsl(var(--border));
  margin: 2rem 0;
}

/* Ensure proper spacing for headings */
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.prose h1 {
  font-size: 2.25rem;
}

.prose h2 {
  font-size: 1.875rem;
}

.prose h3 {
  font-size: 1.5rem;
}

.prose h4 {
  font-size: 1.25rem;
}

.prose h5 {
  font-size: 1.125rem;
}

.prose h6 {
  font-size: 1rem;
}
</style>
