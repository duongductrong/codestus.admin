import { fetcher } from "@/libs/fetch/fetcher"
import { SignInResult, SignInVariables } from "./types/sign-in"
import { SignUpResult, SignUpVariables } from "./types/sign-up"

class AuthService {
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
}

export const authService = new AuthService()
