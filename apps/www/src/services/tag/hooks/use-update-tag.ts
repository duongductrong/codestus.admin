import { createMutation } from "react-query-kit"
import { tagService } from ".."
import { UpdateTagResult, UpdateTagVariables } from "../types/update-tag"

export interface UseUpdateTagVariables extends UpdateTagVariables {}
export interface UseUpdateTagResult extends UpdateTagResult {}

export const useUpdateTag = createMutation<UseUpdateTagResult, UseUpdateTagVariables>({
  mutationKey: [tagService.mutationKeys.updateTag],
  mutationFn: (variables) => tagService.updateTag(variables).then((res) => res.data),
})
