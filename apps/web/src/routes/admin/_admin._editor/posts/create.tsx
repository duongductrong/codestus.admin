import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/_admin/_editor/posts/create")({
  component: () => <div>Hello /admin/_editor/posts/create!</div>,
})
