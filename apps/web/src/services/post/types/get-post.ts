import { FetcherPaginatedVariables, FetcherResult } from "@/libs/fetch/fetcher"
import { Post } from "./post"

export interface GetPostVariables {
  id: string | number
  relations?: string
}

export interface GetPostResult extends FetcherResult<Post> {}
