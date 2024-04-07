"use client"

import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"
import { memo } from "react"
import { getQueryClient } from "@/libs/query"
import EditorForm, { EditorFormProps } from "@/modules/posts/editor/editor-form"
import { useSuspensePost } from "@/services/post/hooks/use-get-post"
import { useSuspensePosts } from "@/services/post/hooks/use-get-posts"
import { useUpdatePost } from "@/services/post/hooks/use-update-post"

export const Route = createFileRoute("/admin/_admin/_editor/posts/_layout/$handler")({
  component: memo(PageComponent),
})

function PageComponent() {
  const params = Route.useParams()

  const { data } = useSuspensePost({
    variables: { id: params.handler, relations: "tags" },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const { mutateAsync: updatePost } = useUpdatePost({
    onSuccess(result) {
      toast.success(result.message)

      getQueryClient.invalidateQueries({ queryKey: useSuspensePosts.getKey() })
      getQueryClient.invalidateQueries({ queryKey: useSuspensePost.getKey() })
    },
    onError(error) {
      toast.error(error.response?.data.message)
    },
  })

  const post = data.data

  const handleEditorSubmit: EditorFormProps["onSubmit"] = async (values) =>
    updatePost({
      id: Number(params.handler),
      // publishAt: values.publishAt || undefined,
      slug: values.slug,
      status: values.status,
      tagIds: values.tags.map((tag) => Number(tag)),
      title: values.title,
      content: values.content || undefined,
      description: values.description || undefined,
      thumbnail: values.thumbnail || undefined,
    }).then((response) => ({
      title: response.data.title,
      description: response.data.description,
      slug: response.data.slug,
      status: response.data.status,
      publishAt: response.data.publishAt,
      tags: response.data.tags?.map((tag) => tag.id.toString()),
      content: response.data.content,
    }))

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
