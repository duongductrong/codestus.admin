import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "@server/modules/user/entities/user.entity"
import { Repository } from "typeorm"

export class GetUsersCountQuery implements IQuery {}

@QueryHandler(GetUsersCountQuery)
export class GetUsersCountHandler implements IQueryHandler<GetUsersCountQuery, number> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUsersCountQuery): Promise<number> {
    return this.userRepository.count()
  }
}
