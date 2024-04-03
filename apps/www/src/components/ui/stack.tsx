import { VariantProps, cva } from "class-variance-authority"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { cn } from "@/libs/utils/tailwind"
import { ForwardRefComponent } from "@/types/react-polymorphic"

export const stackVariants = cva(["flex"], {
  variants: {
    gap: {
      default: "gap-4",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
  },
  defaultVariants: {
    gap: "default",
    direction: "row",
  },
})

export interface StackVariantsProps extends VariantProps<typeof stackVariants> {}

export interface StackProps extends ComponentPropsWithoutRef<"div">, StackVariantsProps {}

export const Stack = forwardRef(
  ({ direction = "row", gap = "default", className, as: Comp = "div", ...props }, ref) => (
    <Comp {...props} ref={ref} className={cn(stackVariants({ direction, gap, className }))} />
  ),
) as ForwardRefComponent<"div", StackProps>
