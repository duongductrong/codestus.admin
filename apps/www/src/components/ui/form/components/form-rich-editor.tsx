"use client"

import { forwardRef, useImperativeHandle } from "react"
import { RichEditor, RichEditorProps } from "../../editor/rich-editor"

export interface FormRichEditorProps {
  // eslint-disable-next-line react/no-unused-prop-types
  variant: "RICH_EDITOR"

  value?: string
  onChange?: (val: string) => void
  onBlur?: () => void
  placeholder?: string
  as?: "html" | "markdown"
}

const FormRichEditor = forwardRef<HTMLInputElement, FormRichEditorProps>(
  ({ onBlur, onChange, as = "markdown", value, placeholder }, ref) => {
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
        onBlur={() => onBlur?.()}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    )
  },
)

export default FormRichEditor
