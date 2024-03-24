import { fetcher } from "../../libs/fetch/fetcher"
import { GetPostsResult, GetPostsVariables } from "./types/get-posts"

class PostService {
  get queryKeys() {
    return {
      getPosts: "/posts",
      getPost: "/posts/:id",
    }
  }

  getPosts(variables?: GetPostsVariables) {
    return fetcher.get<GetPostsResult>("/posts", {
      params: {
        orderBy: {
          field: "createdAt",
          value: "desc",
        },
        ...variables,
      } as GetPostsVariables,
    })
  }
}

export const postService = new PostService()
