import { FetcherResult } from "@/libs/fetch/fetcher"
import { Tag } from "."

export interface DeleteTagVariables extends Pick<Tag, "id"> {}

export interface DeleteTagResult extends FetcherResult<any> {}
