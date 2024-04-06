import { createQuery, createSuspenseQuery } from "react-query-kit"
import { tagService } from ".."
import { FetcherError } from "../../../libs/fetch/fetcher"
import { GetTagResult, GetTagVariables } from "../types/get-tag"

export interface UseTagVariables extends GetTagVariables {}
export interface UseTagResponse extends GetTagResult {}

export const useTag = createQuery<UseTagResponse, UseTagVariables, FetcherError<any>>({
  queryKey: [tagService.queryKeys.getTags],
  fetcher: async (variables) => {
    const result = await tagService.getTag(variables)
    return result.data
  },
})

export const useSuspenseTag = createSuspenseQuery<
  UseTagResponse,
  UseTagVariables,
  FetcherError<any>
>({
  queryKey: [tagService.queryKeys.getTags],
  fetcher: async (variables) => {
    const result = await tagService.getTag(variables)
    return result.data
  },
})
