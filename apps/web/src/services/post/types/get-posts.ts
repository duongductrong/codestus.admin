import { FetcherPaginatedVariables, FetcherResult } from "@/libs/fetch/fetcher"
import { Post } from "./post"

export interface GetPostsVariables extends FetcherPaginatedVariables {
  relations?: string
  search?: string | null
}

export interface GetPostsResult extends FetcherResult<Post[]> {}
