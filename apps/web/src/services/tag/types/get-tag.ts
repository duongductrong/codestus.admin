import { FetcherResult } from "@/libs/fetch/fetcher"
import { Tag } from "."

export interface GetTagVariables {
  id: string | number
}

export interface GetTagResult extends FetcherResult<Tag> {}
