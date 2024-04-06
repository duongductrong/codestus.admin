import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { UpdatePostResult, UpdatePostVariables } from "../types/update-post"
import { postService } from ".."

export interface UseUpdatePostResponse extends UpdatePostResult {}
export interface UseUpdatePostVariables extends UpdatePostVariables {}
export interface UseUpdatePostError extends FetcherError<FetcherValidationError> {}

export const useUpdatePost = createMutation<
  UseUpdatePostResponse,
  UseUpdatePostVariables,
  UseUpdatePostError
>({
  mutationKey: [postService.mutationKeys.updatePost],
  mutationFn: (variables) => postService.updatePost(variables).then((res) => res.data),
})
