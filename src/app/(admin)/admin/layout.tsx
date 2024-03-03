import { LayoutProps } from "@/types/utilities"
import React from "react"

export interface AdminLayoutProps extends LayoutProps<"sidebar"> {}

const AdminLayout = ({ children, sidebar }: AdminLayoutProps) => (
  <div className="flex flex-row">
    {sidebar}
    {children}
  </div>
)

export default AdminLayout
