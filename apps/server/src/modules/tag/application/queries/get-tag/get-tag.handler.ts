import { Inject, NotFoundException } from "@nestjs/common"
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IQuery } from "@server/core/libs/ddd/cqrs.base"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { PostProps } from "@server/modules/post/domain/post"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TagEntity } from "@server/modules/tag/infras/entities/tag.entity"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"
import { set } from "lodash"
import { FindOptionsRelations, FindOptionsWhere } from "typeorm"

export class GetTagQuery implements IQuery {
  id: number | string

  relations?: string[]

  constructor(props: GetTagQuery) {
    Object.assign(this, props)
  }
}

export class GetTagResult implements TagProps {
  id: number

  name: string

  slug: string

  description?: string

  createdAt?: Date

  updatedAt?: Date

  posts?: PostProps[]

  constructor(props: GetTagResult) {
    Object.assign(this, props)
  }
}

@QueryHandler(GetTagQuery)
export class GetTagHandler implements IQueryHandler<GetTagQuery> {
  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  private makeWhere(
    query: GetTagQuery,
  ): FindOptionsWhere<TagEntity> | FindOptionsWhere<TagEntity>[] {
    const where: FindOptionsWhere<TagEntity> | FindOptionsWhere<TagEntity>[] = [
      {
        id: Number(query.id),
      },
      {
        slug: query.id.toString(),
      },
    ]

    return where
  }

  private makeRelations(query: GetTagQuery): FindOptionsRelations<TagEntity> {
    const relations: FindOptionsRelations<TagEntity> = {}

    query.relations?.forEach((key) => {
      set(relations, key, true)
    })

    return relations
  }

  async execute(query: GetTagQuery): Promise<any> {
    const where = this.makeWhere(query)
    const relations = this.makeRelations(query)

    const tag = await this.tagRepo.findOne({ where, relations })

    if (!tag) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    return new GetTagResult(tag.getProps())
  }
}
