"use client"

import { ReactNode } from "react"
import { PostManagerContext, usePostManagerContext } from "./use-post-manager-context"

export interface PostManagerProviderProps {
  children: ReactNode
}

const PostManagerProvider = ({ children }: PostManagerProviderProps) => {
  const store = usePostManagerContext()

  return <PostManagerContext.Provider value={store}>{children}</PostManagerContext.Provider>
}

export default PostManagerProvider
