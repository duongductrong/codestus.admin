import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { tagService } from ".."
import { CreateTagResult, CreateTagVariables } from "../types/create-tag"

export interface UseCreateTagVariables extends CreateTagVariables {}
export interface UseCreateTagResult extends CreateTagResult {}
export interface UseCreateTagError extends FetcherError<FetcherValidationError> {}

export const useCreateTag = createMutation<
  UseCreateTagResult,
  UseCreateTagVariables,
  UseCreateTagError
>({
  mutationKey: [tagService.mutationKeys.createTag],
  mutationFn: (variables) => tagService.createTag(variables).then((res) => res.data),
})
