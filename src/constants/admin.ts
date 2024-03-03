import { IconsProps } from "@/components/ui/icons"
import { PAGE_ROUTES } from "./routes"

export interface SidebarItem {
  key: string
  path: string
  title: string
  icon?: IconsProps["name"]
  children?: SidebarItem[]
}

export const createSidebarItem = (variables: SidebarItem) => variables

export const SIDEBAR_ITEMS: SidebarItem[] = [
  createSidebarItem({
    key: "home",
    title: "Home",
    path: PAGE_ROUTES.HOME,
    icon: "outline.general.home-2",
  }),
  createSidebarItem({
    key: "apps",
    title: "Apps",
    path: PAGE_ROUTES.HOME,
    icon: "outline.general.diamonds",
    children: [
      createSidebarItem({
        key: "apps-eCommerce",
        title: "eCommerce",
        path: PAGE_ROUTES.HOME,
        children: [
          createSidebarItem({
            key: "apps-eCommerce-Products",
            title: "Products",
            path: PAGE_ROUTES.HOME,
          }),
          createSidebarItem({
            key: "apps-Category",
            title: "Categories",
            path: PAGE_ROUTES.HOME,
          }),
        ],
      }),
      createSidebarItem({
        key: "apps-user-management",
        title: "User management",
        path: PAGE_ROUTES.HOME,
      }),
      createSidebarItem({
        key: "apps-task-management",
        title: "Task Management",
        path: PAGE_ROUTES.HOME,
      }),
    ],
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
