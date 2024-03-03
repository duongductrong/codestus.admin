import { IconButton } from "@/components/icon-button"
import { cn } from "@/utils/tailwind"
import HomeIcon from '@/components/ui/icons/outline/general/home-2.svg'
import Icon from "@/components/ui/icons"
import SidebarLogo from "./_components/sidebar-logo"

export interface AdminSidebarProps {}

const AdminSidebar = (props: AdminSidebarProps) => (
  <div
    className={cn(
      "w-app-sidebar h-lvh bg-app-sidebar-background",
      "border-r border-app-sidebar-border",
      "flex flex-col items-center overflow-hidden",
    )}
  >
    <div
      className={cn(
        "size-app-sidebar",
        "border-b border-app-sidebar-border bg-app-sidebar-background",
        "flex items-center justify-center mb-4",
      )}
    >
      <SidebarLogo />
    </div>

    <div className="h-full p-2">
      <IconButton active>
        <Icon name="/outline/general/home-2.svg" className="w-5 h-5" />
      </IconButton>
    </div>
  </div>
)

export default AdminSidebar
