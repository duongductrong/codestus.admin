import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/libs/utils/tailwind"

export const generalModalVariants = cva([], {
  variants: {
    size: {
      sm: "max-w-[calc(100%-32px)] sm:max-w-[500px] w-full",
      lg: "max-w-[calc(100%-32px)] sm:max-w-[800px] w-full",
      md: "max-w-[calc(100%-32px)] sm:max-w-[600px] w-full",
      xl: "max-w-[calc(100%-32px)] sm:max-w-[1000px] w-full",
    },
    type: {
      modal: "",
      drawer: cn(
        "top-4 left-[unset] right-4 translate-y-0 translate-x-0 h-[calc(100vh-2rem)]",

        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[state=closed]:-slide-out-to-right-1/2 data-[state=closed]:slide-out-to-top-0",

        "data-[state=open]:animate-in",
        "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=open]:slide-in-from-right-1/2 data-[state=open]:slide-in-from-top-0",
      ),
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export type GeneralModalVariant = VariantProps<typeof generalModalVariants>
