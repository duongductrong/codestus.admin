import { createQuery, createSuspenseQuery } from "react-query-kit"
import { postService } from ".."
import { FetcherError } from "../../../libs/fetch/fetcher"
import { GetPostStatisticsResult, GetPostStatisticsVariables } from "../types/get-post-statistics"

export interface UsePostStatisticsVariables extends GetPostStatisticsVariables {}
export interface UsePostStatisticsResponse extends GetPostStatisticsResult {}
export interface UsePostStatisticsError extends FetcherError<any> {}

export const usePostStatistics = createQuery<
  UsePostStatisticsResponse,
  UsePostStatisticsVariables,
  UsePostStatisticsError
>({
  queryKey: [postService.queryKeys.getPost],
  fetcher: async (variables) => {
    const result = await postService.getPostStatistics(variables)
    return result.data
  },
})

export const useSuspensePostStatistics = createSuspenseQuery<
  UsePostStatisticsResponse,
  UsePostStatisticsVariables,
  UsePostStatisticsError
>({
  queryKey: [postService.queryKeys.getPost],
  fetcher: async (variables) => {
    const result = await postService.getPostStatistics(variables)
    return result.data
  },
})
