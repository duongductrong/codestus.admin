import { FetcherPaginatedVariables, FetcherResult } from "@/libs/fetch/fetcher";
import { Post } from "./post";

export interface GetPostsVariables extends FetcherPaginatedVariables {
  relations?: string
}

export interface GetPostsResult extends FetcherResult<Post[]> {}
