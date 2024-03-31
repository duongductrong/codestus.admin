import { ElementRef, forwardRef } from "react"
import { Switch, SwitchProps } from "../../switch"

export interface FormSwitchProps extends SwitchProps {
  variant: "SWITCH"
  handleChange?: (checked: boolean) => void
}

const FormSwitch = forwardRef<ElementRef<typeof Switch>, FormSwitchProps>(
  ({ onChange, handleChange, value, ...props }, ref) => (
    <Switch
      {...props}
      ref={ref}
      onCheckedChange={(checked) => {
        onChange?.(checked as any)
        handleChange?.(checked)
      }}
      checked={!!value}
    />
  ),
)

export default FormSwitch
