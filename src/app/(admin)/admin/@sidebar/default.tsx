import { IconButton } from "@/components/icon-button"
import Icon from "@/components/ui/icons"
import { SIDEBAR_ITEMS } from "@/constants/admin"
import { cn } from "@/utils/tailwind"
import Link from "next/link"
import SidebarLogo from "./_components/sidebar-logo"

export interface AdminSidebarProps {}

const AdminSidebar = (props: AdminSidebarProps) => (
  <aside
    className={cn(
      "w-app-sidebar-dimension h-lvh bg-app-sidebar-background",
      "border-accent-darkness border-r",
      "flex flex-col items-center overflow-hidden",
    )}
  >
    <div
      className={cn(
        "size-app-sidebar-dimension",
        "border-accent-darkness border-b bg-app-sidebar-background",
        "mb-4 flex shrink-0 items-center justify-center",
      )}
    >
      <SidebarLogo />
    </div>

    <div className="flex h-full flex-col gap-3 p-2">
      {SIDEBAR_ITEMS.map(({ key, icon, path }, index) => (
        <IconButton key={key} active={index === 0} size="lg" forceDark asChild>
          <Link href={path}>
            <Icon name={icon} className="h-[22px] w-[22px]" />
          </Link>
        </IconButton>
      ))}
    </div>
  </aside>
)

export default AdminSidebar
