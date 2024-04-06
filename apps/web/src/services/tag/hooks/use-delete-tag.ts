import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { tagService } from ".."
import { DeleteTagResult, DeleteTagVariables } from "../types/delete-tag"

export interface UseDeleteTagVariables extends DeleteTagVariables {}
export interface UseDeleteTagResult extends DeleteTagResult {}
export interface UseDeleteTagError extends FetcherError<FetcherValidationError> {}

export const useDeleteTag = createMutation<
  UseDeleteTagResult,
  UseDeleteTagVariables,
  UseDeleteTagError
>({
  mutationKey: [tagService.mutationKeys.deleteTag],
  mutationFn: (variables) => tagService.deleteTag(variables).then((res) => res.data),
})
