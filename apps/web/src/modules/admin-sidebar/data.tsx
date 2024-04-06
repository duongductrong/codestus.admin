import { Book, Home, Library, Shapes } from "lucide-react"

export interface SidebarItem {
  path: string
  icon: React.ReactNode
  label: string
}

export const sidebarItems: SidebarItem[] = [
  {
    path: "/admin",
    icon: <Home />,
    label: "Dashboard",
  },
  {
    path: "/admin/posts",
    icon: <Book />,
    label: "Posts",
  },
  {
    path: "/admin/categories",
    icon: <Shapes />,
    label: "Categories",
  },
  {
    path: "/admin/collections",
    icon: <Library />,
    label: "Collections",
  },
]
