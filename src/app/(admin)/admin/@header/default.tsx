import { PreferredThemeSwitcher } from "@/components/ui/theme"
import { cn } from "@/utils/tailwind"

export interface AdminHeaderProps {}

const AdminHeader = (props: AdminHeaderProps) => (
  <div
    className={cn(
      "sticky left-0 top-0",
      "flex h-app-header-dimension w-full items-center justify-between border-b px-6 py-3",
      "dark:border-accent-darkness border-accent-lightness bg-app-header-background",
    )}
  >
    <h2 className="text-lg font-semibold">Products</h2>

    <PreferredThemeSwitcher />
  </div>
)

export default AdminHeader
