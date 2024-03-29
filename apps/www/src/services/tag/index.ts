import { fetcher } from "../../libs/fetch/fetcher"
import { BulkDeleteTagsResult, BulkDeleteTagsVariables } from "./types/bulk-delete-tags"
import { CreateTagResult, CreateTagVariables } from "./types/create-tag"
import { DeleteTagResult, DeleteTagVariables } from "./types/delete-tag"
import { GetTagResult, GetTagVariables } from "./types/get-tag"
import { GetTagsResult, GetTagsVariables } from "./types/get-tags"
import { UpdateTagResult, UpdateTagVariables } from "./types/update-tag"

class TagService {
  get queryKeys() {
    return {
      getTags: "/tags",
      getTag: "/tags/:id",
    }
  }

  get mutationKeys() {
    return {
      createTag: "/tags",
      updateTag: "/tags/:id",
      deleteTag: "/tags/:id",
      bulkDeleteTags: "/tags/bulk-delete",
    }
  }

  getTags(variables?: GetTagsVariables) {
    return fetcher.get<GetTagsResult>(this.queryKeys.getTags, {
      params: {
        orderBy: {
          field: "createdAt",
          value: "desc",
        },
        ...variables,
      } as GetTagsVariables,
    })
  }

  getTag({ id }: GetTagVariables) {
    return fetcher.get<GetTagResult>(this.queryKeys.getTag.replace(":id", String(id)))
  }

  createTag(variables: CreateTagVariables) {
    return fetcher.post<CreateTagResult>(this.mutationKeys.createTag, variables)
  }

  updateTag(variables: UpdateTagVariables) {
    return fetcher.put<UpdateTagResult>(
      this.mutationKeys.updateTag.replace(":id", String(variables.id)),
      variables,
    )
  }

  deleteTag(variables: DeleteTagVariables) {
    return fetcher.delete<DeleteTagResult>(
      this.mutationKeys.deleteTag.replace(":id", String(variables.id)),
    )
  }

  bulkDeleteTags(variables: BulkDeleteTagsVariables) {
    return fetcher.post<BulkDeleteTagsResult>(this.mutationKeys.bulkDeleteTags, variables)
  }
}

export const tagService = new TagService()
