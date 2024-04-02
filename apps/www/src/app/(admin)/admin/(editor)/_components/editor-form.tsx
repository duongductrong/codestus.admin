"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDeepCompareMemoize } from "@/hooks/use-deep-compare-memoize"
import Form, { FormField } from "@/components/ui/form"
import { useCurrentEditorContext } from "./use-editor-context"
import { useEditorEvents, useEditorSettingsChanges, useEditorSubmission } from "./use-editor-events"
import { useEditorSettings } from "./use-editor-settings"

export const editorFormSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().nullish(),
  description: z.string().nullish(),
  thumbnail: z.string().nullish(),
  tags: z.array(z.string()).default([]),
  publishAt: z.string().nullish(),
  status: z.number().default(0),
})

export interface EditorFormState extends z.infer<typeof editorFormSchema> {}

export interface EditorFormProps {
  title: string
  defaultValues?: Partial<EditorFormState>
  onSubmit: (values: EditorFormState) => void
}

const EditorForm = ({ title, defaultValues, onSubmit }: EditorFormProps) => {
  const methods = useForm<EditorFormState>({
    resolver: zodResolver(editorFormSchema),
    defaultValues,
  })
  const { setTitle, setEditorDirty } = useEditorSettings()
  const { settingSetterEvent } = useEditorEvents()
  const editor = useCurrentEditorContext()

  const handleSave = methods.handleSubmit((values) => {
    onSubmit(values)
  })

  useEffect(() => {
    startTransition(() => {
      setTimeout(() => {
        if (editor) {
          editor.commands.setContent?.(defaultValues?.content ?? " ")
        }
      }, 300)
    })
  }, [defaultValues?.content, editor])

  useEditorSettingsChanges<Partial<EditorFormState>>(
    (values) => {
      methods.reset({
        ...methods.getValues(),
        ...values,
      })
    },
    [defaultValues],
  )

  useEditorSubmission(handleSave)

  useEffect(
    () => {
      if (defaultValues) {
        settingSetterEvent(defaultValues)
      }
    },
    useDeepCompareMemoize([defaultValues]),
  )

  useEffect(() => setTitle(title), [title])

  useEffect(() => setEditorDirty(methods.formState.isDirty), [methods.formState.isDirty])

  return (
    <Form methods={methods} onSubmit={handleSave}>
      <div className="mx-auto my-5 flex min-h-lvh max-w-[800px] flex-col gap-4">
        <FormField
          variant="TEXT"
          name="title"
          placeholder="Enter title..."
          className="border-none p-0 text-3xl font-semibold shadow-none outline-none focus-visible:ring-0"
        />
        <FormField
          variant="RICH_EDITOR"
          name="content"
          placeholder="Write something..."
          as="markdown"
        />
      </div>
    </Form>
  )
}

export default EditorForm
