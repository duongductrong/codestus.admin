"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/utils/tailwind"
import { VariantProps, cva } from "class-variance-authority"

export const checkboxVariants = cva(
  [
    "peer h-5 w-5 shrink-0 rounded border border-transparent",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  ],
  {
    variants: {
      variant: {
        contained: "",
        outlined: "",
      },
      color: {
        default: [
          "[&[data-variant='contained'][data-state='unchecked']]:bg-input [&[data-variant='contained'][data-state='unchecked']]:border-input",
          "[&[data-variant='outlined'][data-state='unchecked']]:border-input",
        ],
      },
    },
    defaultVariants: {},
  },
)

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "color">,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, color = "default", variant = "contained", ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      data-variant={variant}
      data-color={color}
      className={cn(checkboxVariants({ variant, color, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
