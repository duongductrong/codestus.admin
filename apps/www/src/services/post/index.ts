import { fetcher } from "../../libs/fetch/fetcher"
import { GetPostResult, GetPostVariables } from "./types/get-post"
import { GetPostsResult, GetPostsVariables } from "./types/get-posts"

class PostService {
  get queryKeys() {
    return {
      getPosts: "/posts",
      getPost: "/posts/:id",
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
}

export const postService = new PostService()
