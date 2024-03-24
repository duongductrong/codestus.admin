import { createQuery, createSuspenseQuery } from "react-query-kit"
import { tagService } from ".."
import { FetcherError } from "../../../libs/fetch/fetcher"
import { GetTagsResult, GetTagsVariables } from "../types/get-tags"

export interface UseTagsVariables extends GetTagsVariables {}
export interface UseTagsResponse extends GetTagsResult {}

export const useTags = createQuery<UseTagsResponse, UseTagsVariables, FetcherError<any>>({
  queryKey: [tagService.queryKeys.getTags],
  fetcher: async (variables) => {
    const result = await tagService.getTags(variables)
    return result.data
  },
})

export const useSuspenseTags = createSuspenseQuery<UseTagsResponse, UseTagsVariables, FetcherError<any>>({
  queryKey: [tagService.queryKeys.getTags],
  fetcher: async (variables) => {
    const result = await tagService.getTags(variables)
    return result.data
  },
})
