import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import Form, { FormField } from "@/components/ui/form"
import { GeneralModalComponentProps } from "../../types"
import { catchFieldErrors } from "../../utils"
import { TagFormSchema, tagFormSchema } from "./schema"

export interface TagFormValues extends TagFormSchema {}
export interface TagFormSuccessValues extends TagFormSchema {}
export interface TagFormErrorValues {}

export interface TagFormProps extends GeneralModalComponentProps<TagFormValues> {}

const TagForm = ({
  outerRef,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  closeCurrentModal,
}: TagFormProps) => {
  const methods = useForm<TagFormSchema>({
    resolver: zodResolver(tagFormSchema),
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit(async (values) => {
    const result = await onSubmit(values)
    const hasError = catchFieldErrors(result, methods)

    if(hasError) onError(values)
    else onSuccess(values)
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
