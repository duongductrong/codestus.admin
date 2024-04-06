import { fetcher } from "@/libs/fetch/fetcher"
import { AxiosRequestConfig } from "axios"
import { set, unset } from "lodash"
import { GetMeResult, GetMeVariables } from "./types/get-me"
import { SignInResult, SignInVariables } from "./types/sign-in"
import { SignUpResult, SignUpVariables } from "./types/sign-up"

class AuthService {
  get queryKeys() {
    return {
      getMe: "/auth/me",
    }
  }

  get mutationKeys() {
    return {
      signIn: "/auth/login",
      signUp: "/auth/signup",
    }
  }

  signIn(variables: SignInVariables) {
    return fetcher.post<SignInResult>(this.mutationKeys.signIn, variables)
  }

  signUp(variables: SignUpVariables) {
    return fetcher.post<SignUpResult>(this.mutationKeys.signUp, variables)
  }

  getMe(variables: GetMeVariables) {
    const config: AxiosRequestConfig<any> = {}

    if (variables?.token) {
      set(config, "headers.Authorization", `Bearer ${variables.token}`)
    }

    unset(variables, "token")

    return fetcher.get<GetMeResult>(this.queryKeys.getMe, {
      params: variables,
      ...config,
    })
  }
}

export const authService = new AuthService()
