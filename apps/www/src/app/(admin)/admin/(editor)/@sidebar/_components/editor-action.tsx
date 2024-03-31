import React, { ComponentPropsWithoutRef, ReactElement, ReactNode, cloneElement } from "react"
import { TooltipContent, TooltipRoot, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/libs/utils/tailwind"

export interface EditorActionProps extends ComponentPropsWithoutRef<"button"> {
  icon: ReactNode
  title: string
}

const EditorAction = ({ icon, title, className, ...props }: EditorActionProps) => (
  <TooltipRoot>
    <TooltipTrigger asChild>
      <button
        {...props}
        type="button"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
          className,
        )}
      >
        {cloneElement(icon as ReactElement, { className: "w-5 h-5" })}
        <span className="sr-only">{title}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent side="right">{title}</TooltipContent>
  </TooltipRoot>
)

export default EditorAction
