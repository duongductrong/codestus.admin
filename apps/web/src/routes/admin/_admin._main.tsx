import { TooltipProvider } from "@/components/ui/tooltip"
import AdminHeader from "@/modules/admin-header"
import AdminSidebar from "@/modules/admin-sidebar"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/_admin/_main")({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <AdminHeader />
          <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
