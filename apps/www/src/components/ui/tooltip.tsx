"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../utils/tailwind"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export interface ToolTipProps {
  content: React.ReactNode
  children: React.ReactNode

  triggerProps?: TooltipPrimitive.TooltipTriggerProps
  contentProps?: TooltipPrimitive.TooltipContentProps

  portal?: boolean
}

const Tooltip = React.forwardRef<React.ElementRef<typeof TooltipContent>, ToolTipProps>(
  ({ content, children, triggerProps, contentProps, portal = true }, ref) => {
    const TooltipPortal = portal ? TooltipPrimitive.Portal : React.Fragment
    return (
      <TooltipProvider>
        <TooltipRoot delayDuration={0}>
          <TooltipTrigger {...triggerProps}>{children}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent ref={ref} {...contentProps} className={cn(contentProps?.className)}>
              {content}
              <TooltipPrimitive.TooltipArrow className="h-1.5 w-3 fill-primary text-primary" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    )
  },
)

export { TooltipRoot, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
