import { cn } from "@/utils/tailwind"
import { VariantProps, cva } from "class-variance-authority"
import React, { ComponentProps, forwardRef } from "react"

export const iconButtonVariants = cva(
  ["inline-flex items-center justify-center h-11 w-11 rounded-base"],
  {
    variants: {
      active: {
        true: "bg-dark text-white",
      },
      hoverable: {
        true: "hover:bg-dark text-icon-btn-foreground",
      },
    },
    defaultVariants: {
      hoverable: true,
      active: false,
    },
  },
)

export interface IconButtonVariantsProps extends VariantProps<typeof iconButtonVariants> {}

export interface IconButtonProps extends ComponentProps<"button">, IconButtonVariantsProps {}

export const IconButton = forwardRef(
  ({ active, hoverable, className, ...props }: IconButtonProps) => (
    <button
      {...props}
      className={cn(iconButtonVariants({ active, hoverable, className }))}
      type="button"
    />
  ),
)
