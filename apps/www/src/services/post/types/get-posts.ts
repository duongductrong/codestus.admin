import { FetcherPaginatedVariables, FetcherResult } from "@/lib/fetch/fetcher";
import { Post } from "./post";

export interface GetPostsVariables extends FetcherPaginatedVariables {
  relations?: string
}

export interface GetPostsResult extends FetcherResult<Post[]> {}
