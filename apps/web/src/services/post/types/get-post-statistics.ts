import { FetcherResult } from "@/libs/fetch/fetcher"

export interface GetPostStatisticsVariables {}

export interface GetPostStatisticsResult extends FetcherResult<{ totalPageViews: number }> {}
