import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { InjectRepository } from "@nestjs/typeorm"
import { BasePaginationQuery, PaginationParams } from "@server/core/query.base"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { UserRepository } from "@server/modules/user/infras/repositories/user.repository"
import { FindOptionsOrder, FindOptionsOrderValue, Repository } from "typeorm"

export class GetUsersQuery extends BasePaginationQuery implements IQuery {
  constructor(props: PaginationParams<GetUsersQuery>) {
    super(props)
  }
}

export class GetUsersResult extends Array<UserEntity> {}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery, UserEntity[]> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResult> {
    const { orderBy } = query

    const order: FindOptionsOrder<UserEntity> = {}

    if (orderBy) {
      ;(order as any)[orderBy.field] = { direction: orderBy.value } as FindOptionsOrderValue
    }

    return this.userRepository.find({ take: query.limit, skip: query.offset, order })
  }
}
