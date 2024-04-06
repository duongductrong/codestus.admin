import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import PostsStatistics from "@/modules/posts/statistics"

export const Route = createFileRoute("/admin/_admin/_main/posts/_layout")({
  component: PostsLayout,
})

function PostsLayout() {
  return (
    <>
      <PostsStatistics />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  )
}

export default PostsLayout
