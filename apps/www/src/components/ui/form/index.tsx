import { ComponentProps, ReactNode, forwardRef } from "react"
import { FieldValues, FormProvider, FormProviderProps } from "react-hook-form"
import FormControl from "./form-control"
import FormDescription from "./form-description"
import FormField from "./form-field"
import FormFieldInternal from "./form-field-internal"
import FormItem from "./form-item"
import FormMessage from "./form-message"

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends ComponentProps<"form"> {
  methods: Omit<FormProviderProps<TFieldValues, TContext, TTransformedValues>, "children">
  children: ReactNode
}

const Form = forwardRef<HTMLFormElement, FormProps<any>>(({ children, methods, ...props }, ref) => (
  <FormProvider {...methods}>
    <form {...props} ref={ref}>
      {children}
    </form>
  </FormProvider>
))

export { FormControl, FormDescription, FormField, FormFieldInternal, FormItem, FormMessage }

export default Form
