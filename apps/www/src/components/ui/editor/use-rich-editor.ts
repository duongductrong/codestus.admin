import { EditorOptions, useEditor } from "@tiptap/react"
import { useMemo } from "react"
import { takeRichEditorExtensions } from "./rich-editor-extentions"

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
    extensions: useMemo(() => takeRichEditorExtensions({ placeholder }), [placeholder]),
    content: value,
    editable,
    onUpdate: onChange,
    onBlur,
  })

  return editor
}
