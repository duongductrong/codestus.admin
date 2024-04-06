import { ElementRef, forwardRef } from "react"
import { Switch, SwitchProps } from "../../switch"

export interface FormSwitchProps extends SwitchProps {
  variant: "SWITCH"
  numeric?: boolean
}

const FormSwitch = forwardRef<ElementRef<typeof Switch>, FormSwitchProps>(
  ({ onChange, value, numeric, ...props }, ref) => (
    <Switch
      {...props}
      ref={ref}
      onCheckedChange={(checked) => onChange?.(numeric ? Number(checked) : (checked as any))}
      checked={!!value}
    />
  ),
)

export default FormSwitch
