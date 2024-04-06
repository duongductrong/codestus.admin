import { forwardRef } from "react"
import { DatePicker, DatePickerProps } from "../../date-picker"

export type FormDatePickerProps = DatePickerProps & {
  variant: "DATE_PICKER"
}

const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(({ ...props }) => (
  <DatePicker {...props} />
))

FormDatePicker.displayName = "FormDatePicker"

export default FormDatePicker
