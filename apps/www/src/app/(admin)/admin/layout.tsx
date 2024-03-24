import { LayoutProps } from "@/types/utilities"

export interface AdminLayoutProps extends LayoutProps<"sidebar" | "header"> {}

const AdminLayout = ({ children, sidebar, header }: AdminLayoutProps) => (
  <div className="flex flex-row">
    {sidebar}
    <div className="ml-sidebar-size w-[calc(100%-var(--sidebar-size))] flex-1">
      {header}
      <main className="p-6">{children}</main>
    </div>
  </div>
)

export default AdminLayout
