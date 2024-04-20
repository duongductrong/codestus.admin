import { FetcherResult } from "@/libs/fetch/fetcher"

export interface BulkDeleteTagsVariables {
  ids: number[] | string[]
}

export interface BulkDeleteTagsResult extends FetcherResult<any> {}
