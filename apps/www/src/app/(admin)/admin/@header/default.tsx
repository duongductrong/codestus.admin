import { PreferredThemeSwitcher } from "../../../../components/ui/theme"
import { cn } from "../../../../utils/tailwind"
import { HeaderUserProfile } from "./_components/header-user-profile"

export interface AdminHeaderProps {}

const AdminHeader = (props: AdminHeaderProps) => (
  <div
    className={cn(
      "sticky left-0 top-0 z-10",
      "flex h-app-header-dimension w-full items-center justify-between px-6 py-3",
      "bg-background",
    )}
  >
    {/* <h2 className="text-lg font-semibold">Products</h2> */}

    <div className="ml-auto flex items-center gap-2">
      <PreferredThemeSwitcher />
      <HeaderUserProfile />
    </div>
  </div>
)

export default AdminHeader
