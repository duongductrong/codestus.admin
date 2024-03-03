import PreferredTheme from "@/components/ui/theme/preferred-theme"
import { LayoutProps } from "@/types/utilities"
import React from "react"

export interface AdminLayoutProps extends LayoutProps<"sidebar" | "header"> {}

const AdminLayout = ({ children, sidebar, header }: AdminLayoutProps) => (
  <PreferredTheme>
    <div className="flex flex-row">
      {sidebar}
      <div className="flex-1 ml-app-sidebar-dimension">
        {header}
        <main className="p-6">{children}</main>
      </div>
    </div>
  </PreferredTheme>
)

export default AdminLayout
