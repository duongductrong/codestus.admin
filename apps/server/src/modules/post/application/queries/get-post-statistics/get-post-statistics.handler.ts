import { Inject } from "@nestjs/common"
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IQuery } from "@server/core/libs/ddd/cqrs.base"
import { PostRepositoryPort } from "@server/modules/post/domain/post.repository.port"
import { POST_REPOSITORY } from "@server/modules/post/post.di-tokens"

export class GetPostStatisticsQuery implements IQuery {
  constructor(props: GetPostStatisticsQuery) {
    Object.assign(this, props)
  }
}

export class GetPostStatisticsResult {
  totalPageViews: number

  constructor(props: GetPostStatisticsResult) {
    Object.assign(this, props)
  }
}

@QueryHandler(GetPostStatisticsQuery)
export class GetPostStatisticsHandler
  implements IQueryHandler<GetPostStatisticsQuery, GetPostStatisticsResult>
{
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  async execute(query: GetPostStatisticsQuery): Promise<GetPostStatisticsResult> {
    const [totalPageViews] = await Promise.all([this.postRepo.sum("views")])

    return new GetPostStatisticsResult({ totalPageViews: totalPageViews || 0 })
  }
}
