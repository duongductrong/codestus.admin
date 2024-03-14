import { Inject, NotFoundException } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { UserRepository } from "@server/modules/user/infras/repositories/user.repository"
import { UserRepositoryPort } from "@server/modules/user/infras/repositories/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { compact } from "lodash"
import { Repository } from "typeorm"

export class GetUserQuery implements IQuery {
  identifier: string | number

  constructor(props: GetUserQuery) {
    this.identifier = props.identifier
  }
}

export class GetUserResult extends UserEntity {}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  async execute(props: GetUserQuery): Promise<GetUserResult> {
    const result = await this.userRepo.findOne({
      where: compact([
        { email: String(props.identifier) },
        !Number.isNaN(Number(props.identifier)) ? { id: Number(props.identifier) } : null,
      ]),
    })

    if (!result) {
      throw new NotFoundException("The system cannot find the user", { cause: {} })
    }

    return result
  }
}
