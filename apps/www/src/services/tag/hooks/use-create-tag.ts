import { createMutation } from "react-query-kit"
import { tagService } from ".."
import { CreateTagResult, CreateTagVariables } from "../types/create-tag"

export interface UseCreateTagVariables extends CreateTagVariables {}
export interface UseCreateTagResult extends CreateTagResult {}

export const useCreateTag = createMutation<UseCreateTagResult, UseCreateTagVariables>({
  mutationKey: [tagService.mutationKeys.createTag],
  mutationFn: (variables) => tagService.createTag(variables).then((res) => res.data),
})
