import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { authService } from ".."
import { SignInResult, SignInVariables } from "../types/sign-in"

export interface UseSignInResponse extends SignInResult {}
export interface UseSignInVariables extends SignInVariables {}
export interface UseSignInError extends FetcherError<FetcherValidationError> {}

export const useSignIn = createMutation<UseSignInResponse, UseSignInVariables, UseSignInError>({
  mutationKey: [authService.mutationKeys.signIn],
  mutationFn: (variables) => authService.signIn(variables).then((res) => res.data),
})
