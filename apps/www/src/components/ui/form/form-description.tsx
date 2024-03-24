import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/libs/utils/tailwind"
import useFormField from "./hooks/use-form-field"

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    )
  },
)

FormDescription.displayName = "FormDescription"

export default FormDescription
