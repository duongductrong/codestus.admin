import { ForwardRefComponent } from "@/types/react-polymorphic"
import { cn } from "@/utils/tailwind"
import React, { ComponentPropsWithoutRef, forwardRef } from "react"

export interface CustomPageSectionProps extends ComponentPropsWithoutRef<"section"> {
  title: string
  description: string
}

const CustomPageSection = forwardRef(
  ({ children, className, title, description, as: Comp = "section", ...props }, ref) => (
    <Comp {...props} ref={ref} className={cn("container", className)}>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mb-4 text-muted-foreground">{description}</p>
      {children}
    </Comp>
  ),
) as ForwardRefComponent<"section", CustomPageSectionProps>

export default CustomPageSection
