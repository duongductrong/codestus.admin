import { EditorOptions, useEditor } from "@tiptap/react"
import { useMemo } from "react"
import { takeRichEditorExtensions } from "./rich-editor-extentions"

export interface UseRichEditorVariables {
  placeholder?: string
  value?: string
  editable?: boolean
  onChange?: EditorOptions["onUpdate"]
  onBlur?: EditorOptions["onBlur"]
  onCreate?: EditorOptions["onCreate"]
  onBeforeCreate?: EditorOptions["onBeforeCreate"]
}

export const useRichEditor = ({
  editable = true,
  placeholder,
  value,
  onBlur,
  onChange,
  onCreate,
  onBeforeCreate,
}: UseRichEditorVariables = {}) => {
  const editor = useEditor({
    extensions: useMemo(() => takeRichEditorExtensions({ placeholder }), [placeholder]),
    content: value,
    editable,
    onUpdate: onChange,
    onBlur,
    onCreate: (props) => {
      onCreate?.(props)
    },
    onBeforeCreate: (props) => {
      onBeforeCreate?.(props)
    },
  })

  return editor
}
