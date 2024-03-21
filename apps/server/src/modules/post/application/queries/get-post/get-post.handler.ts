import { Inject, NotFoundException } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { PostProps } from "@server/modules/post/domain/post"
import { PostRepositoryPort } from "@server/modules/post/domain/post.repository.port"
import { PostEntity } from "@server/modules/post/infras/entities/post.entity"
import { POST_REPOSITORY } from "@server/modules/post/post.di-tokens"
import { TagProps } from "@server/modules/tag/domain/tag"
import { UserProps } from "@server/modules/user/domain/user"
import { set } from "lodash"
import { FindOptionsRelations } from "typeorm"

export class GetPostQuery implements IQuery {
  id: number

  relations?: string[]

  constructor(props: GetPostQuery) {
    Object.assign(this, props)
  }
}

export class GetPostResult implements PostProps {
  id: number

  title: string

  views: number

  thumbnail?: string | undefined

  slug: string

  description?: string | undefined

  content?: string | undefined

  status: number

  createdAt: Date

  updatedAt: Date

  publishAt: Date

  love: number

  unlove: number

  user: UserProps

  tags: TagProps[]

  constructor(props: GetPostResult) {
    Object.assign(this, props)
  }
}

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery, GetPostResult> {
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  async execute({ id, relations: reqRelations }: GetPostQuery): Promise<GetPostResult> {
    const relations: FindOptionsRelations<PostEntity> = {}

    if (reqRelations?.length) {
      reqRelations.forEach((relation) => {
        set(relations, relation, true)
      })
    }

    const post = await this.postRepo.findOne({
      where: { id },
      relations,
    })

    if (!post) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    return new GetPostResult(post.getProps())
  }
}
