import { cva } from "class-variance-authority"

export const roundedVariants = cva("", {
  variants: {
    rounded: {
      xs: "rounded-sm",
      md: "rounded-md",
      base: "rounded-base",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {},
})
