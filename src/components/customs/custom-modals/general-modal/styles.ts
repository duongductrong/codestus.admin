import { VariantProps, cva } from "class-variance-authority"

export const generalModalVariants = cva([], {
  variants: {
    size: {
      sm: "max-w-[calc(100%-32px)] sm:max-w-[500px] w-full",
      lg: "max-w-[calc(100%-32px)] sm:max-w-[800px] w-full",
      md: "max-w-[calc(100%-32px)] sm:max-w-[600px] w-full",
      xl: "max-w-[calc(100%-32px)] sm:max-w-[1000px] w-full",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export type GeneralModalVariant = VariantProps<typeof generalModalVariants>
