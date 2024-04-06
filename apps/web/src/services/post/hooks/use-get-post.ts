import { createQuery, createSuspenseQuery } from "react-query-kit"
import { postService } from ".."
import { FetcherError, FetcherResponse } from "../../../libs/fetch/fetcher"
import { GetPostResult, GetPostVariables } from "../types/get-post"

export interface UsePostVariables extends GetPostVariables {}
export interface UsePostResponse extends GetPostResult {}
export interface UsePostError extends FetcherError<any> {}

export const usePost = createQuery<UsePostResponse, UsePostVariables, UsePostError>({
  queryKey: [postService.queryKeys.getPost],
  fetcher: async (variables) => {
    const result = await postService.getPost(variables)
    return result.data
  },
})

export const useSuspensePost = createSuspenseQuery<UsePostResponse, UsePostVariables, UsePostError>(
  {
    queryKey: [postService.queryKeys.getPost],
    fetcher: async (variables) => {
      const result = await postService.getPost(variables)
      return result.data
    },
  },
)
