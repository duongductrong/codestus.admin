import { createQuery, createSuspenseQuery } from "react-query-kit"
import { postService } from ".."
import { FetcherError } from "../../../libs/fetch/fetcher"
import { GetPostsResult, GetPostsVariables } from "../types/get-posts"

export interface UsePostsVariables extends GetPostsVariables {}
export interface UsePostsResponse extends GetPostsResult {}

export const usePosts = createQuery<UsePostsResponse, UsePostsVariables, FetcherError<any>>({
  queryKey: [postService.queryKeys.getPosts],
  fetcher: async (variables) => {
    const result = await postService.getPosts(variables)
    return result.data
  },
})

export const useSuspensePosts = createSuspenseQuery<UsePostsResponse, UsePostsVariables, FetcherError<any>>({
  queryKey: [postService.queryKeys.getPosts],
  fetcher: async (variables) => {
    const result = await postService.getPosts(variables)
    return result.data
  },
})
