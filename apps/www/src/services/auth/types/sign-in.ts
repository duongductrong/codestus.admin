import { FetcherResult } from "@/libs/fetch/fetcher"

export interface SignInVariables {
  // The user's email or username
  identifier: string
  password: string
}

export interface SignInResult
  extends FetcherResult<{
    jwtToken: string
    expiredAt: string
  }> {}
