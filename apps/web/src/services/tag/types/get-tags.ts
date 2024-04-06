import { FetcherPaginatedVariables, FetcherResult } from "@/libs/fetch/fetcher"
import { Tag } from "."

export interface GetTagsVariables extends FetcherPaginatedVariables {
  relations?: string
}

export interface GetTagsResult extends FetcherResult<Tag[]> {}
