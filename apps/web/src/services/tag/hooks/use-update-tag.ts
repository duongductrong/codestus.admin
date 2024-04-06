import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { tagService } from ".."
import { UpdateTagResult, UpdateTagVariables } from "../types/update-tag"

export interface UseUpdateTagVariables extends UpdateTagVariables {}
export interface UseUpdateTagResult extends UpdateTagResult {}
export interface UseUpdateTagError extends FetcherError<FetcherValidationError> {}

export const useUpdateTag = createMutation<
  UseUpdateTagResult,
  UseUpdateTagVariables,
  UseUpdateTagError
>({
  mutationKey: [tagService.mutationKeys.updateTag],
  mutationFn: (variables) => tagService.updateTag(variables).then((res) => res.data),
})
