import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import Form, { FormField } from "@/components/ui/form"
import { GeneralModalComponentProps } from "../../types"
import { TagFormSchema, tagFormSchema } from "./schema"

export interface TagFormDefaultValues extends TagFormSchema {}
export interface TagFormSuccessValues extends TagFormSchema {}
export interface TagFormErrorValues {}

export interface TagFormProps extends GeneralModalComponentProps<TagFormDefaultValues> {}

const TagForm = ({ outerRef, defaultValues, onSuccess, onError }: TagFormProps) => {
  const methods = useForm<TagFormSchema>({
    resolver: zodResolver(tagFormSchema),
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit((values) => {
    onSuccess(values)
    onError(null)
  })

  // The actions will trigger me
  useImperativeHandle(outerRef, () => ({
    reset() {},
    submit() {
      handleSubmit()
    },
  }))

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField variant="TEXT" name="name" placeholder="Name" label="Name" />
      <FormField fromName="name" variant="UID" name="slug" placeholder="Handle" label="Handle" />
      <FormField
        variant="TEXTAREA"
        name="description"
        placeholder="Description"
        label="Description"
        rows={8}
      />
    </Form>
  )
}

export default TagForm
