import { FetcherResult } from "@/libs/fetch/fetcher"
import { Post } from "."

export interface CreatePostVariables
  extends Pick<
    Post,
    "title" | "description" | "content" | "status" | "publishAt" | "slug" | "thumbnail"
  > {
  tagIds: number[]
}

export interface CreatePostResult extends FetcherResult<Post> {}
