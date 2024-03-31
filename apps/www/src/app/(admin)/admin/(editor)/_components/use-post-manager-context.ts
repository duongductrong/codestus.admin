import { createContext, useContext } from "react"

export interface PostManagerContextState {}

export const PostManagerContext = createContext<PostManagerContextState>({})

export const usePostManagerContext = () => useContext(PostManagerContext)
