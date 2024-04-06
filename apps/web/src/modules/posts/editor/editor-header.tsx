"use client"

/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ArrowRight,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { Link } from "@tanstack/react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import { useEditorEvents } from "./use-editor-events"
import { useEditorSettings } from "./use-editor-settings"

export interface EditorHeaderProps {}

const EditorHeader = (props: EditorHeaderProps) => {
  const { title, openSettings, isEditorDirty, setOpenSettings } = useEditorSettings()

  const { submitEvent } = useEditorEvents()

  return (
    <header
      className={cn(
        "left-0 top-0 z-30 flex items-center gap-4 self-start !border-b sm:sticky",
        "px-4 py-4 sm:h-auto sm:border-0 sm:px-6",
        "max-h-[var(--el-header-height)] w-full bg-background",
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground">
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={PAGE_ROUTES.ADMIN.POST_LIST}>Posts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title ?? "Current Page"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex flex-1 items-center gap-2 md:grow-0">
        <Button variant="link" onClick={() => setOpenSettings(!openSettings)}>
          <Settings className="h-4 w-4" />
        </Button>
        <Button onClick={() => submitEvent(null)} disabled={!isEditorDirty}>
          Save
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

export default EditorHeader
