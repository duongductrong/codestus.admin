import { Outlet, createFileRoute } from "@tanstack/react-router"
import PostsStatistics from "@/modules/posts/statistics"

export const Route = createFileRoute("/admin/_admin/_main/posts/_layout")({
  component: PostsLayout,
})

function PostsLayout() {
  return (
    <>
      <PostsStatistics />
      <Outlet />
    </>
  )
}

export default PostsLayout
