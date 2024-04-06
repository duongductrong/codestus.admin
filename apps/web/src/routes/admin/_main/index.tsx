import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_main/')({
  component: () => <div>Hello /admin/_layout/!</div>
})