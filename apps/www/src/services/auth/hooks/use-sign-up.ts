import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { authService } from ".."
import { SignUpResult, SignUpVariables } from "../types/sign-up"

export interface UseSignUpResponse extends SignUpResult {}
export interface UseSignUpVariables extends SignUpVariables {}
export interface UseSignUpError extends FetcherError<FetcherValidationError> {}

export const useSignUp = createMutation<UseSignUpResponse, UseSignUpVariables, UseSignUpError>({
  mutationKey: [authService.mutationKeys.signIn],
  mutationFn: (variables) => authService.signUp(variables).then((res) => res.data),
})
