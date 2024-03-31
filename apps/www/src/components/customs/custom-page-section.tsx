import { VariantProps, cva } from "class-variance-authority"
import { ChevronLeft, Settings } from "lucide-react"
import Link from "next/link"
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"
import { cn } from "../../libs/utils/tailwind"
import { ForwardRefComponent } from "../../types/react-polymorphic"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const customPageSectionVariants = cva([], {
  variants: {
    variant: {
      fullWidth: "w-full",
      container: "container",
      central: [
        "max-w-[59rem] w-full mx-auto",
        // "[&>.cps-header]:max-w-[59rem] [&>.cps-header]:w-full [&>.cps-header]:mx-auto",
        // "[&>.cps-main]:max-w-[70rem] [&>.cps-main]:w-full [&>.cps-main]:mx-auto",
      ],
    },
  },
  defaultVariants: {
    variant: "fullWidth",
  },
})

export interface CustomPageSectionVariantsProps
  extends VariantProps<typeof customPageSectionVariants> {}

export interface CustomPageSectionProps
  extends ComponentPropsWithoutRef<"section">,
    CustomPageSectionVariantsProps {
  title?: string
  description?: string

  header?: {
    title: string
    back?: string
    badge?: string
    actions?: ReactNode
  }
}

const CustomPageSection = forwardRef(
  (
    { children, className, title, description, header, as: Comp = "section", variant, ...props },
    ref,
  ) => {
    const hasHeader = title || description
    return (
      <Comp {...props} ref={ref} className={cn(customPageSectionVariants({ variant, className }))}>
        {header ? (
          <div className="cps-header mb-4 flex items-center gap-4">
            {header.back ? (
              <Button
                href={header.back}
                as={Link}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            ) : null}
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {header.title}
            </h1>
            {header.badge ? (
              <Badge variant="outline" className="ml-auto sm:ml-0">
                {header.badge}
              </Badge>
            ) : null}
            {header.actions ? (
              <div className="hidden items-center gap-2 md:ml-auto md:flex">{header.actions}</div>
            ) : null}
          </div>
        ) : null}

        <Card className="col-span-8">
          {hasHeader ? (
            <CardHeader>
              {title ? <CardTitle>{title}</CardTitle> : null}
              {description ? <CardDescription>{description}</CardDescription> : null}
            </CardHeader>
          ) : null}
          <CardContent className={cn(hasHeader ? "" : "pt-4")}>{children}</CardContent>
        </Card>
      </Comp>
    )
  },
) as ForwardRefComponent<"section", CustomPageSectionProps>

export default CustomPageSection
