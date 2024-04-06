import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { tagService } from ".."
import { BulkDeleteTagsResult, BulkDeleteTagsVariables } from "../types/bulk-delete-tags"

export interface UseBulkDeleteTagsVariables extends BulkDeleteTagsVariables {}
export interface UseBulkDeleteTagsResult extends BulkDeleteTagsResult {}
export interface UseBulkDeleteTagsError extends FetcherError<FetcherValidationError> {}

export const useBulkDeleteTags = createMutation<
  UseBulkDeleteTagsResult,
  UseBulkDeleteTagsVariables,
  UseBulkDeleteTagsError
>({
  mutationKey: [tagService.mutationKeys.bulkDeleteTags],
  mutationFn: (variables) => tagService.bulkDeleteTags(variables).then((res) => res.data),
})
