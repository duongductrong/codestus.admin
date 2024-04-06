import { FetcherResult } from "@/libs/fetch/fetcher"
import { Post } from "."

export interface DeletePostVariables extends Pick<Post, "id"> {}

export interface DeletePostResult
  extends FetcherResult<{
    raw: any
    affected?: number | null
  }> {}
