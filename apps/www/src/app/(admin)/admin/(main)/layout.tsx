/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  TooltipProvider
} from "@/components/ui/tooltip"
import { LayoutProps } from "@/types/utilities"

export interface AdminLayoutProps extends LayoutProps<"sidebar" | "header"> {}

export default function AdminLayout({ sidebar, header, children }: AdminLayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {sidebar}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {header}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
