import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight"
import { Color } from "@tiptap/extension-color"
import Image from "@tiptap/extension-image"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import TextStyle from "@tiptap/extension-text-style"
import { EditorOptions, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useMemo } from "react"
import { Markdown } from "tiptap-markdown"
import { common, createLowlight } from "lowlight"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"

const lowlight = createLowlight(common)

lowlight.register({ css, js, ts, html })

export interface UseRichEditorVariables {
  placeholder?: string
  value?: string
  editable?: boolean
  onChange?: EditorOptions["onUpdate"]
  onBlur?: EditorOptions["onBlur"]
}

export const useRichEditor = ({
  editable,
  placeholder,
  value,
  onBlur,
  onChange,
}: UseRichEditorVariables = {}) => {
  const editor = useEditor({
    extensions: useMemo(
      () => [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({}),
        CodeBlockLowlight.configure({
          lowlight,
        }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
        Image.configure({
          inline: true,
        }),
        Placeholder.configure({
          placeholder,
        }),
        // Markdown.configure({}),
      ],
      [placeholder],
    ),
    content: value,
    editable,
    onUpdate: onChange,
    onBlur,
  })

  return editor
}
