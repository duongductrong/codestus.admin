"use client"

import { ForwardRefComponent } from "../../types/react-polymorphic"
import { cn } from "../../utils/tailwind"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { VariantProps, cva } from "class-variance-authority"
import {
  Children,
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useId,
} from "react"

export const listVariants = cva(["flex flex-col gap-1"], {
  variants: {},
  defaultVariants: {},
})

export type ListProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {}

export const List = forwardRef<ElementRef<typeof AccordionPrimitive.Root>, ListProps>(
  ({ children, ...props }, ref) => (
    <AccordionPrimitive.Root {...props} ref={ref} role="list" className={cn(listVariants({}))}>
      {children}
    </AccordionPrimitive.Root>
  ),
)

export const listItemVariants = cva(["rounded-base"], {
  variants: {},
  defaultVariants: {},
})

export interface ListItemProps
  extends Omit<ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, "value">,
    VariantProps<typeof listItemVariants> {
  startIcon?: ReactNode
  endIcon?: ReactNode
  active?: boolean
}

const __getComponentPayload = (comp: any) => comp?._payload || comp?.type?._payload || comp?.type
const __getComponentDisplayName = (payload: any) =>
  payload?.value?.[2] || payload?.value?.displayName || payload?.displayName

export const ListItem = forwardRef(
  ({ children, startIcon, endIcon, active, className, as, ...props }, ref) => {
    const value = useId()
    const hasChild = Children.toArray(children).some(
      (child) =>
        __getComponentDisplayName(__getComponentPayload(child)) === ListItemContent.displayName,
    )

    return (
      <AccordionPrimitive.Item
        {...props}
        ref={ref}
        role="listbox"
        value={value}
        className={cn(listItemVariants({ className }))}
      >
        {typeof children === "string" ? (
          <ListItemTrigger
            {...(props as any)}
            as={as as "button"}
            startIcon={startIcon}
            endIcon={endIcon}
            active={active}
            role="listitem"
            disableTrigger
          >
            {children}
          </ListItemTrigger>
        ) : (
          Children.map(children, (child) => {
            const _c = child as ReactElement
            const _componentName = __getComponentDisplayName(__getComponentPayload(_c))

            if (_componentName === ListItemTrigger.displayName) {
              return cloneElement(_c, { active, startIcon, endIcon, hasChild })
            }

            return _c
          })
        )}
      </AccordionPrimitive.Item>
    )
  },
) as ForwardRefComponent<"div", ListItemProps>

ListItem.displayName = "ListItem"

export const listItemTriggerVariants = cva(
  [
    "cursor-pointer transition-colors",
    "w-full rounded-base px-4 py-2.5 text-sm font-medium text-list-foreground hover:text-primary",
    "flex items-center gap-2",
    "data-[state=open]:text-primary [&[data-state=open]>span>svg]:text-primary [&[data-state=open]>svg]:text-primary [&[data-state=open]>.list-item-endIcon]:rotate-180",
  ],
  {
    variants: {
      active: {
        true: "bg-list-background text-primary",
      },
    },
    defaultVariants: {},
  },
)

export interface ListItemTriggerProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof listItemTriggerVariants> {
  startIcon?: ReactNode
  endIcon?: ReactNode
  hasChild?: boolean
  disableTrigger?: boolean
  disableDefaultDotIcon?: boolean
}

export const ListItemTrigger = forwardRef(
  (
    {
      children,
      startIcon,
      endIcon,
      className,
      active,
      hasChild,
      asChild,
      disableTrigger,
      disableDefaultDotIcon,
      as = "button",
      ...props
    },
    ref,
  ) => {
    const endIconClassName =
      "list-item-endIcon ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
    const TriggerComp = disableTrigger ? as : AccordionPrimitive.Trigger
    return (
      <TriggerComp
        {...props}
        ref={ref}
        className={cn(listItemTriggerVariants({ active, className }))}
      >
        {startIcon ||
          (disableDefaultDotIcon ? null : (
            <span className="mr-1 h-1 w-1 rounded-full bg-current" />
          ))}
        {children}
        {hasChild && !endIcon ? (
          <ChevronDownIcon className={cn(endIconClassName)} />
        ) : endIcon ? (
          <span className={endIconClassName}>{endIcon}</span>
        ) : null}
      </TriggerComp>
    )
  },
) as ForwardRefComponent<"button", ListItemTriggerProps>

ListItemTrigger.displayName = "ListItemTrigger"

export const listItemContentVariants = cva(
  [
    "ml-2",
    "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden",
  ],
  {
    variants: {},
    defaultVariants: {},
  },
)

export interface ListItemContentProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

export const ListItemContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ListItemContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    {...props}
    ref={ref}
    className={cn(listItemContentVariants({ className }))}
  >
    {children}
  </AccordionPrimitive.Content>
))

ListItemContent.displayName = "ListItemContent"
