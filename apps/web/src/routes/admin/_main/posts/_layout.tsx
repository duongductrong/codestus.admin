import PostsStatistics from "@/modules/posts/statistics"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/admin/_main/posts/_layout")({
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
