import { ApiProperty } from "@nestjs/swagger"
import { BasePaginationQuery, PaginationParams } from "@server/core/query.base"
import { TagProps } from "@server/modules/tag/domain/tag"
import { UserProps } from "@server/modules/user/domain/user"
import { IsOptional, IsString } from "class-validator"
import { PostProps } from "../../../domain/post"
import { GetPostsQuery } from "./get-posts.handler"

export class GetPostsRequestDto
  extends BasePaginationQuery
  implements Omit<GetPostsQuery, "relations">
{
  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Relations (example: user,tags)" })
  relations?: string

  constructor(props: PaginationParams<GetPostsRequestDto>) {
    super({
      limit: props?.limit,
      orderBy: props?.orderBy,
      page: props?.page,
    })

    this.relations = props?.relations
  }
}

export class GetPostsResponseDto implements PostProps {
  id: number

  title: string

  views: number

  thumbnail?: string

  slug: string

  description?: string

  content?: string

  status: number

  createdAt: Date

  updatedAt: Date

  publishAt: Date

  love: number

  unlove: number

  user: UserProps

  tags: TagProps[]
}
