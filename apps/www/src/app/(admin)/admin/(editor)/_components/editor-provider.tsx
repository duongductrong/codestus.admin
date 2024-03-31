"use client"

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Color from "@tiptap/extension-color"
import Image from "@tiptap/extension-image"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import TextStyle from "@tiptap/extension-text-style"
import { EditorProvider as EditorProviderPrimitive } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import { common, createLowlight } from "lowlight"
import { ReactNode } from "react"
import { Markdown } from "tiptap-markdown"

const lowlight = createLowlight(common)

lowlight.register({ css, js, ts, html })

export interface EditorProviderProps {
  children: ReactNode
}

export const randomKey = () => new Date().getTime().toString()

const EditorProvider = ({ children }: EditorProviderProps) => (
  <EditorProviderPrimitive
    extensions={[
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
        placeholder: "Write content...",
      }),
      Markdown.configure({}),
    ]}
  >
    {children}
  </EditorProviderPrimitive>
)

export default EditorProvider
