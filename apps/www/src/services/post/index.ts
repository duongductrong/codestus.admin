import { fetcher } from "../../libs/fetch/fetcher"
import { CreatePostResult, CreatePostVariables } from "./types/create-post"
import { GetPostResult, GetPostVariables } from "./types/get-post"
import { GetPostsResult, GetPostsVariables } from "./types/get-posts"
import { UpdatePostVariables } from "./types/update-post"

class PostService {
  get queryKeys() {
    return {
      getPosts: "/posts",
      getPost: "/posts/:id",
    }
  }

  get mutationKeys() {
    return {
      createPost: "/posts",
      updatePost: "/posts/:id",
    }
  }

  getPosts(variables?: GetPostsVariables) {
    return fetcher.get<GetPostsResult>(this.queryKeys.getPosts, {
      params: {
        orderBy: {
          field: "createdAt",
          value: "desc",
        },
        ...variables,
      } as GetPostsVariables,
    })
  }

  getPost({ id, ...variables }: GetPostVariables) {
    return fetcher.get<GetPostResult>(this.queryKeys.getPost.replace(":id", String(id)), {
      params: {
        ...variables,
      } as GetPostVariables,
    })
  }

  createPost(variables: CreatePostVariables) {
    return fetcher.post<CreatePostResult>(this.mutationKeys.createPost, variables)
  }

  updatePost(variables: UpdatePostVariables) {
    return fetcher.put<GetPostResult>(
      this.queryKeys.getPost.replace(":id", String(variables.id)),
      variables,
    )
  }
}

export const postService = new PostService()
