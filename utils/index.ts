import type { JSONContent } from '@tiptap/vue-3'

export const defaultTipTapContent: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [],
    },
  ],
}

// Check if the JSON content is not empty
export function hasJsonContent(content: any): boolean {
  if (!content || !Array.isArray(content.content))
    return false
  return content.content.some((node: any) => {
    if (node.type === 'paragraph') {
      return node.content?.some((child: any) => !!child.text?.trim())
    }
    return true
  })
}
