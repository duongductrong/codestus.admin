"use client"

import { CheckboxProps } from "@radix-ui/react-checkbox"
import { forwardRef, useEffect } from "react"
import { Checkbox } from "../../checkbox"

export interface FormCheckboxProps extends CheckboxProps {
  variant: "CHECKBOX"
}

const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ onChange, checked, defaultChecked, value, ...props }, ref) => {
    useEffect(() => {
      if (onChange) {
        onChange(defaultChecked as any)
      }
    }, [defaultChecked, onChange])

    return (
      <Checkbox
        {...props}
        ref={ref}
        value={value}
        checked={value === undefined ? defaultChecked : !!value}
        onChange={onChange}
        onCheckedChange={(_value) => onChange && onChange(_value as any)}
      />
    )
  },
)

FormCheckbox.displayName = "FormCheckbox"

export default FormCheckbox
