/* eslint-disable react/jsx-no-constructed-context-values */
import { forwardRef, HTMLAttributes, useId } from "react"
import { cn } from "@/libs/utils/tailwind"
import FormItemContext from "./context/form-item-context"

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-[10px]", className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = "FormItem"

export default FormItem
