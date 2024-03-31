"use client"

import { useUnifiedTransformer } from "@/libs/markdown/use-unified"
import { useSuspensePost } from "@/services/post/hooks/use-get-post"
import { ParamsProps } from "@/types/utilities"
import EditorForm from "../../_components/editor-form"

export const revalidate = false

export interface PostHandlerProps extends ParamsProps<"handler"> {}

const PostHandler = ({ params: { handler } }: PostHandlerProps) => {
  const { data } = useSuspensePost({
    variables: { id: handler },
    refetchOnWindowFocus: false,
  })

  const post = data.data
  const { content, loading } = useUnifiedTransformer(data.data.content ?? "")
  const defaultValues = {
    title: post.title,
    description: post.description,
    slug: post.slug,
    status: post.status,
    publishAt: post.publishAt,
    content,
  }

  if (loading) return null

  return <EditorForm title={post.title} defaultValues={defaultValues} />
}

export default PostHandler
