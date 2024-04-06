import { fetcher } from "../../libs/fetch/fetcher"
import { CreatePostResult, CreatePostVariables } from "./types/create-post"
import { DeletePostResult, DeletePostVariables } from "./types/delete-post"
import { GetPostResult, GetPostVariables } from "./types/get-post"
import { GetPostsResult, GetPostsVariables } from "./types/get-posts"
import { UpdatePostResult, UpdatePostVariables } from "./types/update-post"

class PostService {
  get queryKeys() {
    return {
      getPosts: "/posts",
      getPost: "/posts/:id",
    }
  }

  get mutationKeys() {
    return {
      createPost: "/posts/",
      updatePost: "/posts/:id",
      deletePost: "/posts/:id",
    }
  }

  getPosts(variables?: GetPostsVariables) {
    return fetcher.get<GetPostsResult>(this.queryKeys.getPosts, {
      params: {
        ...variables,
        orderBy: {
          field: "createdAt",
          value: "desc",
          ...variables?.orderBy,
        },
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
    return fetcher.put<UpdatePostResult>(
      this.queryKeys.getPost.replace(":id", String(variables.id)),
      variables,
    )
  }

  deletePost({ id }: DeletePostVariables) {
    return fetcher.delete<DeletePostResult>(this.mutationKeys.deletePost.replace(":id", String(id)))
  }
}

export const postService = new PostService()
