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
}

const FormRichEditor = forwardRef<HTMLInputElement, FormRichEditorProps>(
  ({ onBlur, onChange, value, placeholder }, ref) => {
    useImperativeHandle(ref, () => null as any, [])

    const handleOnChange: RichEditorProps["onChange"] = ({ editor }) => {
      const content = editor.storage.markdown.getMarkdown()
      onChange?.(content)
    }

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
