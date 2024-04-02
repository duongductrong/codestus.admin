"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Form, { FormField } from "@/components/ui/form"
import { cn } from "@/libs/utils/tailwind"
import { editorFormSchema } from "../../../_components/editor-form"
import { useEditorEvents, useEditorSettingSetter } from "../../../_components/use-editor-events"
import { useEditorSettings } from "../../../_components/use-editor-settings"
import FormFieldTags from "./_components/form-field-tags"

export const editorSettingsSchema = editorFormSchema.omit({
  content: true,
  title: true,
})

export interface EditorSettingsState extends z.infer<typeof editorSettingsSchema> {}

export interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  const { settingChangesEvent } = useEditorEvents()
  const { openSettings, setOpenSettings } = useEditorSettings()

  const methods = useForm<EditorSettingsState>({
    resolver: zodResolver(editorSettingsSchema),
  })

  const handleSaveChanges = methods.handleSubmit((values) => {
    settingChangesEvent(values)
    setOpenSettings(false)

    toast.info("Setting changed.")
  })

  useEditorSettingSetter<EditorSettingsState>((data) => {
    methods.reset({
      description: data.description,
      publishAt: data.publishAt,
      slug: data.slug,
      tags: data.tags,
      thumbnail: data.thumbnail,
    })
  })

  if (!openSettings) return null

  return (
    <Form methods={methods} onSubmit={handleSaveChanges}>
      <Card
        className={cn(
          "fixed bottom-0 right-0 top-[calc(var(--el-header-height)+var(--el-toolbar-height))] h-full",
          "flex h-auto w-[500px] flex-col rounded-none border-r-0 border-t-0",
        )}
      >
        <CardHeader className="flex-row justify-between border-b">
          <div className="flex flex-col gap-1">
            <CardTitle>Settings</CardTitle>
            <CardDescription>Add information for your blog</CardDescription>
          </div>

          <button type="button" aria-label="Close" onClick={() => setOpenSettings(false)}>
            <XIcon className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-6">
          <FormField
            variant="DATE_PICKER"
            name="publishAt"
            label="Publish Date"
            withTime
            fullWidth
          />
          <FormField variant="TEXT" name="slug" label="Slug" />
          <FormField variant="TEXTAREA" rows={5} name="description" label="Description" />
          <FormFieldTags />
          <FormField variant="SWITCH" name="status" label="Status" numeric />
        </CardContent>
        <CardFooter className="mt-auto flex justify-end">
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}

export default Settings
