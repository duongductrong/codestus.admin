"use client"

 
import { Link } from "@tanstack/react-router"
/* eslint-disable jsx-a11y/anchor-is-valid */
import { PaintBucket, Paperclip, Pen, Settings } from "lucide-react"

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import EditorSidebarAction from "./editor-sidebar-action"

export interface EditorSidebarProps {}

const EditorSidebar = (props: EditorSidebarProps) => (
  <TooltipProvider>
    <aside className="fixed inset-y-0 left-0 top-[calc(var(--el-header-height)+var(--el-toolbar-height))] z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <EditorSidebarAction icon={<Pen />} title="Pen" />
        <EditorSidebarAction icon={<Paperclip />} title="Paper" />
        <EditorSidebarAction icon={<PaintBucket />} title="Color" />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipRoot>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </TooltipRoot>
      </nav>
    </aside>
  </TooltipProvider>
)

export default EditorSidebar
