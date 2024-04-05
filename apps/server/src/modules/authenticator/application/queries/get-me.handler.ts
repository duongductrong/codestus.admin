import { Inject, NotFoundException } from "@nestjs/common"
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { IQuery } from "@server/core/libs/ddd/cqrs.base"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UserProps } from "@server/modules/user/domain/user"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { omit } from "lodash"

export class GetMeQuery implements IQuery<Pick<UserProps, "id">> {
  id: number

  constructor(props: GetMeQuery) {
    Object.assign(this, props)
  }
}

export class GetMeResult implements Omit<UserProps, "password" | "providerId"> {
  id: number

  email: string

  name?: string | null

  emailVerifiedAt?: Date

  rememberToken?: string

  provider?: string

  avatar?: string

  createdAt?: Date

  updatedAt?: Date

  constructor(props: UserProps) {
    Object.assign(this, omit(props, ["password", "providerId"]))
  }
}

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery, GetMeResult> {
  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  async execute(query: GetMeQuery): Promise<GetMeResult> {
    const user = await this.userRepo.findOne({ where: { id: query.id } })

    if (!user) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    const userProps = user.getProps()

    return new GetMeResult(userProps)
  }
}
