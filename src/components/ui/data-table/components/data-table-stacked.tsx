import { cn } from "@/utils/tailwind"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

export interface DataTableStackedProps extends ComponentPropsWithoutRef<"div"> {}

export const DataTableStacked = forwardRef<ElementRef<"div">, DataTableStackedProps>(
  ({ className, ...props }, ref) => (
    <div {...props} ref={ref} className={cn("flex items-center gap-2", className)} />
  ),
)
