/* eslint-disable react/no-unused-prop-types */

"use client"

import { forwardRef, useImperativeHandle } from "react"
import { RichEditor, RichEditorProps } from "../../editor/rich-editor"

export interface FormRichEditorProps
  extends Pick<RichEditorProps, "placeholder" | "value" | "onBeforeCreate" | "onCreate"> {
  variant: "RICH_EDITOR"

  onChange?: (val: string) => void
  onBlur?: () => void
  as?: "html" | "markdown"
}

const FormRichEditor = forwardRef<HTMLInputElement, FormRichEditorProps>(
  ({ onBlur, onChange, onBeforeCreate, onCreate, as = "markdown", value, placeholder }, ref) => {
    const handleOnChange: RichEditorProps["onChange"] = ({ editor }) => {
      switch (as) {
        case "html":
          onChange?.(editor.getHTML())
          break
        case "markdown":
          onChange?.(editor.storage.markdown.getMarkdown())
          break
        default:
          throw new Error("Cannot find the type of `as`")
      }
    }

    useImperativeHandle(ref, () => null as any, [])

    return (
      <RichEditor
        value={value}
        onCreate={onCreate}
        onChange={handleOnChange}
        onBeforeCreate={onBeforeCreate}
        onBlur={() => onBlur?.()}
        placeholder={placeholder}
      />
    )
  },
)

export default FormRichEditor
