"use client"

import { useEffect, useState } from "react"
import EditorForm from "../../../_components/editor-form"

export interface PostHandlerCreatorProps {}

export const revalidate = false

const PostHandlerCreator = (props: PostHandlerCreatorProps) => {
  const [key, setKey] = useState(new Date().getTime().toString())

  useEffect(() => {
    setTimeout(() => {
      setKey(new Date().getTime().toString())
    }, 300)
  }, [])
  return <EditorForm key={key} />
}

export default PostHandlerCreator
