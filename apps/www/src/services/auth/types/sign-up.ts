import { FetcherResult } from "@/libs/fetch/fetcher"
import { User } from "@/services/user/types/user"

export interface SignUpVariables {
  // The user's email or username
  email: string
  // The user's password
  password: string
}

export interface SignUpResult extends FetcherResult<User> {}
