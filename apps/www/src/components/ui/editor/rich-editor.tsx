/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import "./rich-editor.css"

import { EditorContent, EditorOptions, useCurrentEditor } from "@tiptap/react"
import { CSSProperties, ReactElement, ReactNode, cloneElement, useEffect } from "react"
import { useElementSize } from "@/hooks/use-element-size"
import { cn } from "@/libs/utils/tailwind"
import { useRichEditor } from "./use-rich-editor"

export interface RichEditorProps {
  value?: string
  placeholder?: string
  editable?: boolean
  onChange?: EditorOptions["onUpdate"]
  onBlur?: EditorOptions["onBlur"]

  menubar?: ReactNode
}

export const RichEditor = ({
  value,
  placeholder,
  editable,
  menubar,
  onChange,
  onBlur,
}: RichEditorProps) => {
  const provideEditor = useCurrentEditor()?.editor
  const editor =
    // extend provider
    provideEditor ||
    // Controlled editor
    useRichEditor({ editable, placeholder, value, onBlur, onChange })

  const [ref, { width, height, offsetLeft, offsetY }] = useElementSize()

  useEffect(() => {
    function eventEmitterFromProvider() {
      if (provideEditor) {
        if (onChange) provideEditor.on("update", onChange)
        if (onBlur) provideEditor.on("blur", onBlur)
      }
    }

    eventEmitterFromProvider()
  }, [provideEditor])

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
