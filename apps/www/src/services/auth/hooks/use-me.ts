import { FetcherError } from "@/libs/fetch/fetcher"
import { createQuery, createSuspenseQuery } from "react-query-kit"
import { authService } from ".."
import { GetMeResult, GetMeVariables } from "../types/get-me"

export interface UseMeResponse extends GetMeResult {}
export interface UseMeVariables extends GetMeVariables {}
export interface UseMeError extends FetcherError<any> {}

export const useMe = createQuery<UseMeResponse, UseMeVariables, UseMeError>({
  queryKey: [authService.queryKeys.getMe],
  fetcher: (variables) => authService.getMe(variables).then((res) => res.data),
})

export const useSuspenseMe = createSuspenseQuery<UseMeResponse, UseMeVariables, UseMeError>({
  queryKey: [authService.queryKeys.getMe],
  fetcher: (variables) => authService.getMe(variables).then((res) => res.data),
})
