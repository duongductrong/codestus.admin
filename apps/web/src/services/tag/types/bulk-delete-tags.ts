import { FetcherResult } from "@/libs/fetch/fetcher"
import { Tag } from "."

export interface BulkDeleteTagsVariables {
  ids: number[] | string[]
}

export interface BulkDeleteTagsResult extends FetcherResult<any> {}
