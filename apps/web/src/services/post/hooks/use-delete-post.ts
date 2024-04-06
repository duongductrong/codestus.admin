import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { postService } from ".."
import { DeletePostResult, DeletePostVariables } from "../types/delete-post"

export interface UseDeletePostResponse extends DeletePostResult {}
export interface UseDeletePostVariables extends DeletePostVariables {}
export interface UseDeletePostError extends FetcherError<FetcherValidationError> {}

export const useDeletePost = createMutation<
  UseDeletePostResponse,
  UseDeletePostVariables,
  UseDeletePostError
>({
  mutationKey: [postService.mutationKeys.updatePost],
  mutationFn: (variables) => postService.deletePost(variables).then((res) => res.data),
})
