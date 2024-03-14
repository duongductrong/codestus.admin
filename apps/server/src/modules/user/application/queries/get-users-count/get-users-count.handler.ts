import { Inject } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserRepositoryPort } from "@server/modules/user/infras/repositories/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"

export class GetUsersCountQuery implements IQuery {}

@QueryHandler(GetUsersCountQuery)
export class GetUsersCountHandler implements IQueryHandler<GetUsersCountQuery, number> {
  @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort

  async execute(query: GetUsersCountQuery): Promise<number> {
    return this.userRepository.count()
  }
}
