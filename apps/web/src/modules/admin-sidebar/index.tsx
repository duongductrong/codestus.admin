"use client"

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { ReactElement, cloneElement } from "react"
import { TooltipContent, TooltipRoot, TooltipTrigger } from "@/components/ui/tooltip"
import { sidebarItems } from "./data"

export interface AdminSidebarProps {}

const AdminSidebar = (props: AdminSidebarProps) => (
  <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      <Link
        href="#"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {sidebarItems.map((item) => (
        <TooltipRoot key={item.path}>
          <TooltipTrigger asChild>
            <Link
              href="#"
              to={item.path}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              {cloneElement(item.icon as ReactElement, { className: "h-5 w-5" })}
              <span className="sr-only">{item.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </TooltipRoot>
      ))}
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
)

export default AdminSidebar
