import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/_admin/_main/")({
  component: () => <div>Hello /admin/_layout/!</div>,
  loader: async () => {
    throw redirect({
      to: "/admin/posts",
    })
  },
})
