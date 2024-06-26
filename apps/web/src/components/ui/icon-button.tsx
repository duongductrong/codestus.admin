import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import React, { ComponentProps, ElementRef, forwardRef } from "react"
import { cn } from "../../libs/utils/tailwind"

export const iconButtonVariants = cva(
  ["inline-flex items-center justify-center rounded-md", "[&>*]:size-5"],
  {
    variants: {
      active: {
        true: "bg-muted text-muted-foreground",
      },
      hoverable: {
        true: "hover:bg-icon-btn-background text-icon-btn-foreground",
      },
      size: {
        default: "size-9",
        lg: "size-10",
      },
    },
    defaultVariants: {
      hoverable: true,
      active: false,
      size: "default",
    },
  },
)

export interface IconButtonVariantsProps extends VariantProps<typeof iconButtonVariants> {}

export interface IconButtonProps extends ComponentProps<"button">, IconButtonVariantsProps {
  asChild?: boolean
  forceDark?: boolean
}

export const IconButton = forwardRef<ElementRef<"button">, IconButtonProps>(
  ({ active, hoverable, size, className, asChild, forceDark, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        {...props}
        ref={ref}
        type="button"
        style={
          forceDark
            ? ({
                "--icon-btn-background": "var(--accent-dark)",
                "--icon-btn-foreground": "var(--accent-light)",
              } as React.CSSProperties)
            : undefined
        }
        className={cn(iconButtonVariants({ size, active, hoverable, className }))}
      />
    )
  },
)
