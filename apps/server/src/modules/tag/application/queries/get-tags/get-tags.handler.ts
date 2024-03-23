import { Inject } from "@nestjs/common"
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IQuery } from "@server/core/libs/ddd/cqrs.base"
import { BasePaginationQuery } from "@server/core/query.base"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"

export class GetTagsQuery extends BasePaginationQuery implements IQuery {
  constructor(props: GetTagsQuery) {
    super({ limit: props.limit, orderBy: props.orderBy, page: props.page })
    Object.assign(props)
  }
}

export class GetTagsResult {
  data: TagProps[]

  count: number

  constructor(props: GetTagsResult) {
    Object.assign(this, props)
  }
}

@QueryHandler(GetTagsQuery)
export class GetTagsHandler implements IQueryHandler<GetTagsQuery, GetTagsResult> {
  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  async execute(command: GetTagsQuery): Promise<GetTagsResult> {
    const [tags, count] = await Promise.all([
      this.tagRepo.find({ skip: command.offset, take: command.limit }),
      this.tagRepo.count(),
    ])

    return new GetTagsResult({
      count,
      data: tags.map((tag) => tag.getProps()),
    })
  }
}
