import { Form } from "../../../../ui/form"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { GeneralModalComponentProps } from "../types"

export interface TemplateProps extends GeneralModalComponentProps {}

const Template = ({ outerRef, defaultValues, onSuccess, onError }: TemplateProps) => {
  const methods = useForm({
    // resolver: zodResolver()
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit((values) => {
    // Call api or do something here

    // and dispatch result for trigger component
    // eslint-disable-next-line no-constant-condition
    if ("success") {
      onSuccess(values)
      // eslint-disable-next-line no-constant-condition
    } else if ("error") {
      onError(values)
    }
  })

  // The actions will trigger me
  useImperativeHandle(outerRef, () => ({
    reset() {},
    submit() {
      handleSubmit()
    },
  }))

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit}>Form fields</form>
    </Form>
  )
}

export default Template
