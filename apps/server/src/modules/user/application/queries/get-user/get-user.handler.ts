import { NotFoundException } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { UserRepository } from "@server/modules/user/infras/repositories/user.repository"
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
  constructor(private readonly userRepo: UserRepository) {}

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
