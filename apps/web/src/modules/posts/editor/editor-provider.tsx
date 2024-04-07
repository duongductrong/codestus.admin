"use client"

import { ReactNode, memo, useRef } from "react"
import { EditorContext, createEditorStore } from "./use-editor-context"
// import { EditorProvider as EditorProviderPrimitive } from "@tiptap/react"
// import { takeRichEditorExtensions } from "@/components/ui/editor/rich-editor-extentions"

export interface EditorProviderProps {
  children: ReactNode
}

const EditorProvider = ({ children }: EditorProviderProps) => {
  const store = useRef(createEditorStore({})).current

  // return (
  //   <EditorProviderPrimitive
  //     extensions={takeRichEditorExtensions({ placeholder: "Write content" })}
  //   >
  //     {children}
  //   </EditorProviderPrimitive>
  // )

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>
}

export default EditorProvider
