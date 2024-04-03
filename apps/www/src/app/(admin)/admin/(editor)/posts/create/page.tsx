"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import slugify from "slugify"
import { toast } from "sonner"
import { useCreatePost } from "@/services/post/hooks/use-create-post"
import { PAGE_ROUTES } from "@/constants/routes"

export interface PostCreationProps {}

const PostCreation = (props: PostCreationProps) => {
  const router = useRouter()
  const { mutate } = useCreatePost({
    onSuccess(data) {
      toast.success(data.message, { position: "top-right" })
      router.push(PAGE_ROUTES.ADMIN.POST_EDIT.replace(":id", String(data.data.id)))
    },
  })

  useEffect(() => {
    const title = `Untitled Post ${new Date().getTime()}`
    const slug = slugify(title, { lower: true, strict: true })
    mutate({ title, content: "", status: 0, tagIds: [], slug })
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 flex h-lvh w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin" />
        Creating new post...
      </div>
    </div>
  )
}

export default PostCreation
