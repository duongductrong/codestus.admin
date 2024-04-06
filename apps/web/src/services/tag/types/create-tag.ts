import { FetcherResult } from "@/libs/fetch/fetcher"
import { Tag } from "."

export interface CreateTagVariables extends Pick<Tag, "name" | "description" | "slug"> {}

export interface CreateTagResult extends FetcherResult<Tag> {}
