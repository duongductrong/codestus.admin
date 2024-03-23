import { BasePaginationQuery } from "@server/core/query.base"
import { GetTagsQuery } from "./get-tags.handler"

export class GetTagsRequestDto extends BasePaginationQuery implements GetTagsQuery {}

export class GetTagsResponseDto {}
