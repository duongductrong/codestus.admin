import { VariantProps, cva } from "class-variance-authority"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import invariant from "tiny-invariant"
import { cn } from "../../libs/utils/tailwind"
import { ForwardRefComponent } from "../../types/react-polymorphic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const customPageSectionVariants = cva([], {
  variants: {
    fullWidth: {
      true: "w-full",
    },
    container: {
      true: "container",
    },
  },
  defaultVariants: {},
})

export interface CustomPageSectionVariantsProps
  extends VariantProps<typeof customPageSectionVariants> {}

export interface CustomPageSectionProps
  extends ComponentPropsWithoutRef<"section">,
    CustomPageSectionVariantsProps {
  title: string
  description: string
}

const CustomPageSection = forwardRef(
  (
    {
      children,
      className,
      title,
      description,
      as: Comp = "section",
      fullWidth = true,
      container = false,
      ...props
    },
    ref,
  ) => {
    if (container && fullWidth)
      throw new Error("Both attributes fullWidth and container cannot be true at the same time.")

    return (
      <Comp
        {...props}
        ref={ref}
        className={cn(customPageSectionVariants({ fullWidth, container, className }))}
      >
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </Comp>
    )
  },
) as ForwardRefComponent<"section", CustomPageSectionProps>

export default CustomPageSection
