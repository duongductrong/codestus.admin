import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cn } from "../../../../libs/utils/tailwind"

export interface DataTableToolbarProps extends ComponentPropsWithoutRef<"div"> {}

export const DataTableToolbar = forwardRef<ElementRef<"div">, DataTableToolbarProps>(
  ({ children, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn("mb-4 flex w-full flex-wrap items-center justify-between gap-2", className)}
    >
      {children}
    </div>
  ),
)
