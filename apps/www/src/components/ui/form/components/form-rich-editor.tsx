"use client"

import { Loader } from "lucide-react"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { useUnifiedTransformer } from "@/libs/markdown/use-unified"
import { RichEditor, RichEditorProps } from "../../editor/rich-editor"

export interface FormRichEditorProps {
  // eslint-disable-next-line react/no-unused-prop-types
  variant: "RICH_EDITOR"

  value?: string
  onChange?: (val: string) => void
  onBlur?: () => void
  placeholder?: string
  as?: "html" | "markdown"
  convertedFrom?: "html" | "markdown" | "raw"
}

const FormRichEditor = forwardRef<HTMLInputElement, FormRichEditorProps>(
  ({ onBlur, onChange, value, placeholder, convertedFrom = "raw", as = "markdown" }, ref) => {
    const methods = useFormContext()

    if (!methods) throw new Error("useFormContext must be used inside a FormProvider")

    const triggerCount = useRef<number>(0)
    const { content: generatedContent, loading } = useUnifiedTransformer(
      value ?? "",
      convertedFrom,
      convertedFrom !== "raw",
    )

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

    useEffect(() => {
      if ((value !== generatedContent) !== Boolean(triggerCount.current)) {
        triggerCount.current += 1
        methods.setValue("content", generatedContent, { shouldDirty: false, shouldValidate: false })
      }
    }, [value, generatedContent])

    useImperativeHandle(ref, () => null as any, [])

    return loading ? (
      <Loader className="h-4 w-4 animate-spin" />
    ) : (
      <RichEditor
        value={generatedContent}
        onBlur={() => onBlur?.()}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    )
  },
)

export default FormRichEditor
