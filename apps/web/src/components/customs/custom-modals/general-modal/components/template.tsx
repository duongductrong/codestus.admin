import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Form from "@/components/ui/form"
import { GeneralModalComponentProps } from "../types"

export const schema = z.object({})
export type SchemaType = z.infer<typeof schema>

export interface FormTemplateDefaultValues extends SchemaType {}
export interface FormTemplateSuccessValues extends SchemaType {}
export interface FormTemplateErrorValues {}

export interface FormTemplateProps extends GeneralModalComponentProps<FormTemplateDefaultValues> {}

const FormTemplate = ({ outerRef, defaultValues, onSuccess, onError }: FormTemplateProps) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
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
      Example
    </Form>
  )
}

export default FormTemplate
