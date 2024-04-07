/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import "./rich-editor.css"

import { Editor, EditorContent, EditorOptions, useCurrentEditor } from "@tiptap/react"
import { CSSProperties, ReactElement, ReactNode, cloneElement, useEffect } from "react"
import { useElementSize } from "@/hooks/use-element-size"
import { cn } from "@/libs/utils/tailwind"
import { useRichEditor } from "./use-rich-editor"

export interface RichEditorProps {
  editor?: Editor | null
  value?: string
  placeholder?: string
  editable?: boolean
  onChange?: EditorOptions["onUpdate"]
  onBlur?: EditorOptions["onBlur"]
  onCreate?: EditorOptions["onCreate"]
  onBeforeCreate?: EditorOptions["onBeforeCreate"]

  menubar?: ReactNode
}

export const RichEditor = ({
  value,
  placeholder,
  editable,
  menubar,
  editor: _editor,
  onChange,
  onBlur,
  onCreate,
  onBeforeCreate,
}: RichEditorProps) => {
  const externalEditor = _editor || useCurrentEditor()?.editor

  const editor = useRichEditor({
    editable,
    placeholder,
    value,
    onBlur,
    onChange,
    onCreate,
    onBeforeCreate,
  })

  const [ref, { width, height, offsetLeft, offsetY }] = useElementSize()

  useEffect(() => {
    function eventEmitterFromProvider() {
      if (externalEditor) {
        if (onChange) externalEditor.on("update", onChange)
        if (onBlur) externalEditor.on("blur", onBlur)
      }
    }

    eventEmitterFromProvider()
  }, [externalEditor])

  return (
    <div
      ref={ref}
      style={
        {
          "--rich-editor-width": `${width}px`,
          "--rich-editor-height": `${height}px`,
          "--rich-editor-offset-left": `${offsetLeft}px`,
          "--rich-editor-offset-top": `${offsetY <= 0 ? 16 : offsetY}px`,
        } as CSSProperties
      }
      className="relative"
    >
      <EditorContent
        editor={editor}
        className={cn(
          "prose w-full max-w-full border-none font-inter outline-none ring-0 dark:prose-invert",
          "[&>.tiptap]:outline-none",
        )}
        placeholder={placeholder}
      />
      {menubar ? cloneElement(menubar as ReactElement, { editor }) : null}
      {/* <RichEditorMenuBar root={{ width, height }} editor={editor} direction="vertical" /> */}
    </div>
  )
}
