import { IconsProps } from "@/components/ui/icons"
import { PAGE_ROUTES } from "./routes"

export interface SidebarItem {
  key: string
  path: string
  title: string
  icon: IconsProps["name"]
  children?: SidebarItem[]
}

export const createSidebarItem = (variables: SidebarItem) => variables

export const SIDEBAR_ITEMS: SidebarItem[] = [
  createSidebarItem({
    key: "home",
    title: "Home",
    path: PAGE_ROUTES.HOME,
    icon: "outline.general.home-2",
    children: [
      createSidebarItem({
        key: "dashboard-1",
        icon: "outline.abstract.abstract-47",
        path: PAGE_ROUTES.HOME,
        title: "Dashboard",
      }),
      createSidebarItem({
        key: "revenue-1",
        icon: "outline.abstract.abstract-48",
        path: PAGE_ROUTES.HOME,
        title: "Revenue",
      }),
      createSidebarItem({
        key: "reports-1",
        icon: "outline.abstract.abstract-40",
        path: PAGE_ROUTES.HOME,
        title: "Reports",
      }),
    ],
  }),
  createSidebarItem({
    key: "page-2",
    title: "Page 2",
    path: PAGE_ROUTES.HOME,
    icon: "outline.abstract.abstract-35",
  }),
  createSidebarItem({
    key: "Components",
    title: "Components",
    path: PAGE_ROUTES.COMPONENTS,
    icon: "outline.abstract.abstract-26",
  }),
  createSidebarItem({
    key: "page-4",
    title: "Page 4",
    path: PAGE_ROUTES.HOME,
    icon: "outline.abstract.abstract-21",
  }),
]
