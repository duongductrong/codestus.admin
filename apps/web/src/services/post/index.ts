import { fetcher } from "../../libs/fetch/fetcher"
import { CreatePostResult, CreatePostVariables } from "./types/create-post"
import { DeletePostResult, DeletePostVariables } from "./types/delete-post"
import { GetPostResult, GetPostVariables } from "./types/get-post"
import { GetPostStatisticsResult, GetPostStatisticsVariables } from "./types/get-post-statistics"
import { GetPostsResult, GetPostsVariables } from "./types/get-posts"
import { UpdatePostResult, UpdatePostVariables } from "./types/update-post"

class PostService {
  get queryKeys() {
    return {
      getPosts: "/posts",
      getPost: "/posts/:id",
      getPostStatistics: "/posts/statistics",
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

  getPostStatistics(variables?: GetPostStatisticsVariables) {
    return fetcher.get<GetPostStatisticsResult>(this.queryKeys.getPostStatistics, {
      params: {
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
