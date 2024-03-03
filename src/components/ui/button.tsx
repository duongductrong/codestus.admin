import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { ForwardRefComponent } from "@/types/react-polymorphic"
import { cn } from "@/utils/tailwind"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 whitespace-nowrap",
    "rounded-base text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        contained: "border border-transparent",
        outlined: "border shadow-sm",
        text: "border border-transparent",
        icon: "",
      },
      color: {
        default: cn(
          "shadow",
          "data-[variant=contained]:bg-primary data-[variant=contained]:hover:bg-primary/90 data-[variant=contained]:text-primary-foreground",
          "data-[variant=outlined]:border-primary data-[variant=outlined]:hover:border-primary/90 data-[variant=outlined]:text-primary",
          "data-[variant=text]:text-primary data-[variant=text]:hover:border-primary",
        ),
        secondary: cn(
          "data-[variant=contained]:bg-secondary data-[variant=contained]:hover:bg-secondary/80 text-secondary-foreground shadow-sm",
          "data-[variant=outlined]:border-secondary data-[variant=outlined]:hover:border-secondary/80",
          "data-[variant=text]:text-secondary-foreground data-[variant=text]:hover:border-secondary",
        ),
        destructive: cn(
          "data-[variant=contained]:bg-destructive data-[variant=contained]:hover:bg-destructive/80 text-destructive-foreground shadow-sm",
          "data-[variant=outlined]:border-destructive data-[variant=outlined]:hover:border-destructive/80 data-[variant=outlined]:text-destructive",
          "data-[variant=text]:text-destructive data-[variant=text]:hover:border-destructive",
        ),

        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-base px-3 text-xs",
        lg: "h-11 rounded-base px-8",
        icon: "size-11 rounded-base",
      },
    },
    defaultVariants: {},
    compoundVariants: [
      {
        size: "icon",
        variant: "icon",
      },
    ],
  },
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Button = React.forwardRef(
  (
    {
      className,
      variant = "contained",
      size = "default",
      color = "default",
      startIcon,
      endIcon,
      children,
      as: Comp = "button",
      ...props
    },
    ref,
  ) => (
    <Comp
      data-color={color}
      data-variant={variant}
      className={cn(buttonVariants({ variant, color, size, className }))}
      ref={ref}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </Comp>
  ),
) as ForwardRefComponent<"button", ButtonProps>
Button.displayName = "Button"

export { Button, buttonVariants }
