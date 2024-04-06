import { createFileRoute } from "@tanstack/react-router"
import { debounce } from "lodash"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import slugify from "slugify"
import { toast } from "sonner"
import { useCreatePost } from "@/services/post/hooks/use-create-post"
import { getQueryClient } from "@/libs/query"
import { usePosts } from "@/services/post/hooks/use-get-posts"

export const Route = createFileRoute("/admin/_admin/_editor/posts/_layout/create")({
  component: PageComponent,
})

function PageComponent() {
  const navigate = Route.useNavigate()

  const { mutate } = useCreatePost({
    onSuccess(data) {
      getQueryClient.invalidateQueries({ queryKey: usePosts.getKey() })

      navigate({
        to: "/admin/posts/$handler",
        params: {
          handler: String(data.data.id),
        },
        replace: true,
      })

      toast.success(data.message, { position: "top-right" })
    },
  })

  useEffect(
    debounce(() => {
      const title = `Untitled Post ${new Date().getTime()}`
      const slug = slugify(title, { lower: true, strict: true })
      mutate({ title, content: "", status: 0, tagIds: [], slug })
    }, 200),
    [],
  )

  return (
    <div className="fixed left-0 top-0 z-50 flex h-lvh w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin" />
        Creating new post...
      </div>
    </div>
  )
}
