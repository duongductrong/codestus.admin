import { FetcherResult } from "@/libs/fetch/fetcher"
import { Post } from "."

export interface UpdatePostVariables
  extends Pick<
    Post,
    "id" | "title" | "description" | "content" | "status" | "publishAt" | "slug" | "thumbnail"
  > {
  tagIds: number[]
}

export interface UpdatePostResult extends FetcherResult<Post> {}
