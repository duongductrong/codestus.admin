import { forwardRef } from "react"
import { Combobox, ComboboxProps } from "../../combobox"

export interface FormSelectProps extends ComboboxProps {
  variant: "SELECT"
}

const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>((props, ref) => (
  <Combobox {...props} ref={ref} />
))

FormSelect.displayName = "FormSelect"

export default FormSelect
