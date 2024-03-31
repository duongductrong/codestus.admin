"use client"

import get from "lodash/get"
import { Asterisk } from "lucide-react"
import { HTMLInputTypeAttribute, forwardRef } from "react"
import { cn } from "@/libs/utils/tailwind"
import { FormCheckboxProps } from "./components/form-checkbox"
import { FormDatePickerProps } from "./components/form-datepicker"
import { FormInputProps } from "./components/form-input"
import { FormNumberProps } from "./components/form-number"
import FormRadioGroup, { FormRadioGroupProps } from "./components/form-radio-group"
import { FormRichEditorProps } from "./components/form-rich-editor"
import { FormTextareaProps } from "./components/form-textarea"
import { FormUIDProps } from "./components/form-uid"
import { FORM_UNIFIED_VARIANT } from "./constants"
import FormControl from "./form-control"
import FormDescription from "./form-description"
import {
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormNumber,
  FormRichEditor,
  FormTextarea,
  FormUID,
} from "./form-field-imports"
import FormFieldInternal from "./form-field-internal"
import FormItem from "./form-item"
import FormLabel from "./form-label"
import FormMessage from "./form-message"

export type FormFieldVariantBaseProps =
  | FormTextareaProps
  | FormInputProps
  | FormCheckboxProps
  | FormRadioGroupProps
  | FormUIDProps
  | FormNumberProps
  | FormRichEditorProps
  | FormDatePickerProps

export interface FormFieldStandardBaseProps {
  type?: HTMLInputTypeAttribute
  name: string
  id?: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean

  wrapperClassName?: string
  className?: string
}

const FORM_UNIFIED_VARIANT_LOADER = {
  [FORM_UNIFIED_VARIANT.TEXT]: FormInput,
  [FORM_UNIFIED_VARIANT.TEXTAREA]: FormTextarea,
  [FORM_UNIFIED_VARIANT.CHECKBOX]: FormCheckbox,
  [FORM_UNIFIED_VARIANT.RADIO_GROUP]: FormRadioGroup,
  [FORM_UNIFIED_VARIANT.UID]: FormUID,
  [FORM_UNIFIED_VARIANT.NUMBER]: FormNumber,
  [FORM_UNIFIED_VARIANT.RICH_EDITOR]: FormRichEditor,
  [FORM_UNIFIED_VARIANT.DATE_PICKER]: FormDatePicker,
  // [FORM_UNIFIED_VARIANT.SELECT]: FormSelect,
  // [FORM_UNIFIED_VARIANT.SELECT_INFINITE]: FormSelectInfinite,
} as Record<keyof typeof FORM_UNIFIED_VARIANT, any>

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldStandardBaseProps & FormFieldVariantBaseProps
>(({ name, variant, description, label, wrapperClassName, className, ...baseProps }, ref) => {
  const InputComp = FORM_UNIFIED_VARIANT_LOADER[variant] as any

  return (
    <FormFieldInternal
      name={name}
      render={({ field, formState: { errors } }) => {
        const _error = get(errors, name)
        const shouldHorizontalShowing = variant === "CHECKBOX"

        return (
          <FormItem
            className={cn(
              wrapperClassName,
              shouldHorizontalShowing ? "flex items-center gap-2 space-y-0" : "",
            )}
            ref={ref}
          >
            {label ? (
              <FormLabel
                className={cn("flex items-center", shouldHorizontalShowing ? "order-2" : "")}
              >
                {label}
                {baseProps?.required ? <Asterisk className="ml-1 h-3 w-3" /> : ""}
              </FormLabel>
            ) : null}
            <FormControl>
              <InputComp
                {...field}
                {...baseProps}
                hasError={!!_error?.message}
                className={cn(
                  className,
                  _error?.message ? "!border-destructive" : null,
                  shouldHorizontalShowing ? "order-1" : "",
                )}
              />
            </FormControl>

            {_error?.message ? null : description ? <FormDescription /> : null}

            {_error && _error.message ? <FormMessage /> : null}
          </FormItem>
        )
      }}
    />
  )
})

FormField.displayName = "FormField"

export default FormField
