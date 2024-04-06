import { FetcherResult } from "@/libs/fetch/fetcher"
import { Tag } from "."

export interface UpdateTagVariables extends Pick<Tag, "id" | "name" | "description" | "slug"> {}

export interface UpdateTagResult extends FetcherResult<Tag> {}
