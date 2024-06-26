import { Inject, NotFoundException } from "@nestjs/common"
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserProps } from "@server/modules/user/domain/user"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { compact } from "lodash"

export class GetUserQuery implements IQuery {
  identifier: string | number

  constructor(props: GetUserQuery) {
    this.identifier = props.identifier
  }
}

export class GetUserResult implements UserProps {
  id: number

  password: string

  email: string

  name?: string

  emailVerifiedAt?: Date

  rememberToken?: string

  provider?: string

  providerId?: string

  avatar?: string

  createdAt?: Date

  updatedAt?: Date

  constructor(props: UserProps) {
    Object.assign(this, props)
  }
}

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

    return new GetUserResult(result.getProps())
  }
}
