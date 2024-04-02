"use client"

import { useQueryClient } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { useUnifiedTransformer } from "@/libs/markdown/use-unified"
import { useSuspensePost } from "@/services/post/hooks/use-get-post"
import { useSuspensePosts } from "@/services/post/hooks/use-get-posts"
import { useUpdatePost } from "@/services/post/hooks/use-update-post"
import { ParamsProps } from "@/types/utilities"
import EditorForm, { EditorFormProps } from "../../_components/editor-form"

export const revalidate = false

export interface PostHandlerProps extends ParamsProps<"handler"> {}

const PostHandler = ({ params: { handler } }: PostHandlerProps) => {
  const ql = useQueryClient()
  const { data } = useSuspensePost({
    variables: { id: handler, relations: "tags" },
    refetchOnWindowFocus: false,
  })

  const { content: htmlContent, loading: isLoadingConvertContent } = useUnifiedTransformer(
    data.data.content || "",
    "markdown",
  )

  const { mutateAsync: updatePost } = useUpdatePost({
    onSuccess(result, variables, context) {
      toast.success(result.message)

      ql.invalidateQueries({ queryKey: useSuspensePosts.getKey() })
    },
    onError(error, variables, context) {
      toast.error(error.response?.data.message)
    },
  })

  const post = data.data

  const handleEditorSubmit: EditorFormProps["onSubmit"] = async (values) => {
    updatePost({
      id: Number(handler),
      // publishAt: values.publishAt || undefined,
      slug: values.slug,
      status: values.status,
      tagIds: values.tags.map((tag) => Number(tag)),
      title: values.title,
      content: values.content || undefined,
      description: values.description || undefined,
      thumbnail: values.thumbnail || undefined,
    })
  }

  if (isLoadingConvertContent) return <Loader className="h-4 w-4 animate-spin" />

  return (
    <EditorForm
      title={post.title}
      defaultValues={{
        title: post.title,
        description: post.description,
        slug: post.slug,
        status: post.status,
        publishAt: post.publishAt,
        tags: post.tags?.map((tag) => tag.id.toString()),
        content: post.content,
      }}
      onSubmit={handleEditorSubmit}
    />
  )
}

export default PostHandler
