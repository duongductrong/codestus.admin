import { Inject } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BasePaginationQuery, PaginationParams } from "@server/core/query.base"
import { UserProps } from "@server/modules/user/domain/user"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { FindOptionsOrder, FindOptionsOrderValue } from "typeorm"

export class GetUsersQuery extends BasePaginationQuery implements IQuery {
  constructor(props: PaginationParams<GetUsersQuery>) {
    super(props)
  }
}

export class GetUsersResult extends Array<UserProps> {}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery, GetUsersResult> {
  @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort

  async execute(query: GetUsersQuery): Promise<GetUsersResult> {
    const { orderBy } = query

    const order: FindOptionsOrder<UserEntity> = {}

    if (orderBy) {
      ;(order as any)[orderBy.field] = { direction: orderBy.value } as FindOptionsOrderValue
    }

    const result = await this.userRepository.find({ take: query.limit, skip: query.offset, order })
    const records = result.map((user) => user.getProps())

    return records
  }
}
