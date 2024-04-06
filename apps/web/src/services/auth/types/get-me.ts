import { FetcherResult } from "@/libs/fetch/fetcher"
import { User } from "@/services/user/types/user"

export interface GetMeVariables {
  token?: string
}

export interface GetMeResult extends FetcherResult<User> {}
