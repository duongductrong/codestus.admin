import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/admin/_admin")({
  beforeLoad(opts) {
    if (!opts.context.auth.isAuthenticated) {
      throw redirect({ to: "/login", search: { redirect: opts.location.href } })
    }

    return <Outlet />
  },
  component: LayoutComponent,
  pendingComponent: () => (
    <Suspense>
      <Outlet />
    </Suspense>
  ),
  errorComponent: () => {
    throw redirect({
      to: "/login",
    })
  },
})

function LayoutComponent() {
  return <Outlet />
}
