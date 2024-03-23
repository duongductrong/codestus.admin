import { BasePaginationQuery } from "@server/core/query.base"
import { TagProps } from "@server/modules/tag/domain/tag"
import { PostProps } from "@server/modules/post/domain/post"
import { GetTagsQuery } from "./get-tags.handler"

export class GetTagsRequestDto extends BasePaginationQuery implements GetTagsQuery {}

export class GetTagsResponseDto implements TagProps {
  id: number

  name: string

  slug: string

  description?: string

  posts?: PostProps[]

  createdAt?: Date

  updatedAt?: Date
}
