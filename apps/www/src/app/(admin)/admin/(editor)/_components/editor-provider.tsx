"use client"

import { EditorProvider as EditorProviderPrimitive } from "@tiptap/react"
import { ReactNode } from "react"
import { takeRichEditorExtensions } from "@/components/ui/editor/rich-editor-extentions"

export interface EditorProviderProps {
  children: ReactNode
}

export const randomKey = () => new Date().getTime().toString()

const EditorProvider = ({ children }: EditorProviderProps) => (
  <EditorProviderPrimitive extensions={takeRichEditorExtensions({ placeholder: "Write content" })}>
    {children}
  </EditorProviderPrimitive>
)

export default EditorProvider
