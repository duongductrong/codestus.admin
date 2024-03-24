import { fetcher } from "../../libs/fetch/fetcher"
import { GetTagsResult, GetTagsVariables } from "./types/get-tags"

class TagService {
  get queryKeys() {
    return {
      getTags: "/tags",
      getPost: "/tags/:id",
    }
  }

  getTags(variables?: GetTagsVariables) {
    return fetcher.get<GetTagsResult>("/tags", {
      params: {
        orderBy: {
          field: "createdAt",
          value: "desc",
        },
        ...variables,
      } as GetTagsVariables,
    })
  }
}

export const tagService = new TagService()
