import { forwardRef } from "react"
import { DatePicker, DatePickerProps } from "../../date-picker"

export type FormDatePickerProps = DatePickerProps

const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(({ ...props }) => <DatePicker {...props} />)

FormDatePicker.displayName = "FormDatePicker"

export default FormDatePicker
