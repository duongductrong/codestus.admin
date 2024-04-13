import { Inject } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BasePaginationQuery, PaginationParams } from "@server/core/query.base"
import { set } from "lodash"
import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Like } from "typeorm"
import { PostProps } from "../../../domain/post"
import { PostRepositoryPort } from "../../../domain/post.repository.port"
import { PostEntity } from "../../../infras/entities/post.entity"
import { POST_REPOSITORY } from "../../../post.di-tokens"

export class GetPostsQuery extends BasePaginationQuery implements IQuery {
  /**
   * Relations to `user`, `tags`
   */
  relations: string[]

  search?: string

  constructor(props: PaginationParams<GetPostsQuery>) {
    super({ limit: props.limit, orderBy: props.orderBy, page: props.page })
    this.relations = props?.relations
    this.search = props?.search
  }
}

export class GetPostsResult {
  data: PostProps[]

  count: number

  constructor(props: GetPostsResult) {
    Object.assign(this, props)
  }
}

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery, GetPostsResult> {
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  async execute(command: GetPostsQuery): Promise<GetPostsResult> {
    const order: FindOptionsOrder<PostEntity> = {}
    const relations: FindOptionsRelations<PostEntity> = {}
    const where: FindOptionsWhere<PostEntity>[] = []

    if (command.orderBy?.field && command.orderBy?.field) {
      set(order, command.orderBy?.field, command.orderBy?.value)
    }

    if (command.relations) {
      command.relations?.forEach((field) => {
        const f = field.trim()
        set(relations, f, true)
      })
    }

    if (command.search) {
      where.push(
        { title: Like(`%${command.search}%`) },
        { description: Like(`%${command.search}%`) },
      )
    }

    const [posts, count] = await Promise.all([
      this.postRepo.find({
        order,
        relations,
        where,
        skip: command.offset,
        take: command.limit,
      }),
      this.postRepo.count({ where }),
    ])

    return { data: posts.map((post) => post.getProps()), count }
  }
}
