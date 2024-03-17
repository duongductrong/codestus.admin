import { Inject } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BasePaginationQuery, PaginationParams } from "@server/core/query.base"
import { set } from "lodash"
import { FindOptionsOrder, FindOptionsRelations } from "typeorm"
import { PostProps } from "../../domain/post"
import { PostRepositoryPort } from "../../domain/post.repository.port"
import { PostEntity } from "../../infras/entities/post.entity"
import { POST_REPOSITORY } from "../../post.di-tokens"

export class GetPostsQuery extends BasePaginationQuery implements IQuery {
  /**
   * Relations to `user`, `tags`
   */
  relations: string

  constructor(props: PaginationParams<GetPostsQuery>) {
    super({ limit: props.limit, orderBy: props.orderBy, page: props.page })
    this.relations = props.relations
  }
}

export class GetPostsResult extends Array<PostProps> {}

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery, GetPostsResult> {
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  async execute(command: GetPostsQuery): Promise<GetPostsResult> {
    const order: FindOptionsOrder<PostEntity> = {}
    const relations: FindOptionsRelations<PostEntity> = {}

    if (command.orderBy?.field && command.orderBy?.field) {
      set(order, command.orderBy?.field, command.orderBy?.value)
    }

    if (command.relations) {
      command.relations.split(",").forEach((field) => {
        const f = field.trim()
        set(relations, f, true)
      })
    }

    const posts = await this.postRepo.find({
      order,
      relations,
      skip: command.offset,
      take: command.limit,
    })

    return posts.map((post) => post.getProps())
  }
}
