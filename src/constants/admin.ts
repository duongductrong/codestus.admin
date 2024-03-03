import { IconsProps } from "@/components/ui/icons"
import { PAGE_ROUTES } from "./routes"

export interface SidebarItem {
  key: string
  path: string
  title: string
  icon: IconsProps["name"]
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    key: "home",
    title: "Home",
    path: PAGE_ROUTES.HOME,
    icon: "outline.general.home-2",
  },
  {
    key: "page-2",
    title: "Page 2",
    path: PAGE_ROUTES.HOME,
    icon: "outline.abstract.abstract-35",
  },
  {
    key: "Components",
    title: "Components",
    path: PAGE_ROUTES.COMPONENTS,
    icon: "outline.abstract.abstract-26",
  },
  {
    key: "page-4",
    title: "Page 4",
    path: PAGE_ROUTES.HOME,
    icon: "outline.abstract.abstract-21",
  },
]
