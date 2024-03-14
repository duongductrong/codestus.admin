import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { UserRepository } from "@server/modules/user/infras/repositories/user.repository"
import { Repository } from "typeorm"

export class GetUsersCountQuery implements IQuery {}

@QueryHandler(GetUsersCountQuery)
export class GetUsersCountHandler implements IQueryHandler<GetUsersCountQuery, number> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersCountQuery): Promise<number> {
    return this.userRepository.count()
  }
}
