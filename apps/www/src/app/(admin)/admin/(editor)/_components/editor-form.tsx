"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { startTransition, useEffect } from "react"
import Form, { FormField } from "@/components/ui/form"
import { useCurrentEditorContext } from "./use-editor-context"

export const editorFormSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().nullish(),
  description: z.string().nullish(),
  thumbnail: z.string().nullish(),
  tags: z.array(z.string()).default([]),
  publishAt: z.date().or(z.string()).nullish(),
  status: z.number(),
})

export interface EditorFormProps {
  defaultValues?: Partial<z.infer<typeof editorFormSchema>>
}

const EditorForm = ({ defaultValues }: EditorFormProps) => {
  const methods = useForm({
    defaultValues,
  })
  const editor = useCurrentEditorContext()

  useEffect(() => {
    startTransition(() => {
      setTimeout(() => {
        if (editor) {
          editor.commands.setContent?.(defaultValues?.content ?? " ")
        }
      }, 300)
    })
  }, [defaultValues?.content, editor])

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit((values) => console.log(values))}>
      <div className="mx-auto my-5 flex min-h-lvh max-w-[800px] flex-col gap-4">
        <FormField
          variant="TEXT"
          name="title"
          placeholder="Enter title..."
          className="border-none p-0 text-3xl font-semibold shadow-none outline-none focus-visible:ring-0"
        />
        <FormField variant="RICH_EDITOR" name="content" placeholder="Write something..." />
      </div>
    </Form>
  )
}

export default EditorForm
