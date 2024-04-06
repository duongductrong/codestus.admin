import { createMutation } from "react-query-kit"
import { FetcherError, FetcherValidationError } from "@/libs/fetch/fetcher"
import { postService } from ".."
import { CreatePostResult, CreatePostVariables } from "../types/create-post"

export interface UseCreatePostResponse extends CreatePostResult {}
export interface UseCreatePostVariables extends CreatePostVariables {}
export interface UseCreatePostError extends FetcherError<FetcherValidationError> {}

export const useCreatePost = createMutation<
  UseCreatePostResponse,
  UseCreatePostVariables,
  UseCreatePostError
>({
  mutationKey: [postService.mutationKeys.createPost],
  mutationFn: (variables) => postService.createPost(variables).then((res) => res.data),
})
