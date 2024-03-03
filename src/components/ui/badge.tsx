import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/tailwind"

const badgeVariants = cva(
  "inline-flex items-center rounded-base border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "",
        soft: "",
      },
      color: {
        default: [
          "data-[variant=contained]:bg-primary data-[variant=contained]:text-primary-foreground data-[variant=contained]:hover:bg-primary/80 data-[variant=contained]:border-transparent",
          "data-[variant=outlined]:border-primary data-[variant=outlined]:text-primary",
          "data-[variant=soft]:border-primary-soft data-[variant=soft]:bg-primary-soft data-[variant=soft]:text-primary",
        ],
        secondary: [
          "data-[variant=contained]:bg-secondary data-[variant=contained]:text-secondary-foreground data-[variant=contained]:hover:bg-secondary/80 data-[variant=contained]:border-transparent",
          "data-[variant=outlined]:border-secondary data-[variant=outlined]:text-secondary",
          "data-[variant=soft]:border-secondary-soft data-[variant=soft]:bg-secondary-soft data-[variant=soft]:text-secondary",
        ],
        destructive: [
          "data-[variant=contained]:bg-destructive data-[variant=contained]:text-destructive-foreground data-[variant=contained]:hover:bg-destructive/80 data-[variant=contained]:border-transparent",
          "data-[variant=outlined]:border-destructive data-[variant=outlined]:text-destructive",
          "data-[variant=soft]:border-destructive-soft data-[variant=soft]:bg-destructive-soft data-[variant=soft]:text-destructive",
        ],
        success: [
          "data-[variant=contained]:bg-success data-[variant=contained]:text-success-foreground data-[variant=contained]:hover:bg-success/80 data-[variant=contained]:border-transparent",
          "data-[variant=outlined]:border-success data-[variant=outlined]:text-success",
          "data-[variant=soft]:border-success-soft data-[variant=soft]:bg-success-soft data-[variant=soft]:text-success",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  },
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant = "soft", color = "default", ...props }: BadgeProps) {
  return (
    <div
      data-variant={variant}
      data-color={color}
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
