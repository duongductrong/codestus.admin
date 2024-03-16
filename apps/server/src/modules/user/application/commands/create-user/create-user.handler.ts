import { Inject } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { UserFactory } from "@server/modules/user/domain/user.factory"
import { UserRepository } from "@server/modules/user/infras/repositories/user.repository"
import { USER_FACTORY, USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { omit } from "lodash"
import { UserEntity } from "../../../infras/entities/user.entity"

export class CreateUserCommand implements ICommand {
  name?: string

  email: string

  password: string

  avatar?: string | undefined

  constructor(props: CreateUserCommand) {
    this.email = props.email
    this.name = props.name
    this.password = props.password
    this.avatar = props.avatar
  }
}

export class CreateUserResult extends UserEntity {
  constructor(props: UserEntity) {
    super()
    Object.assign(this, omit(props, ["password"]))
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, CreateUserResult> {
  @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository

  @Inject(USER_FACTORY) userFactory: UserFactory

  async execute(payload: CreateUserCommand): Promise<CreateUserResult> {
    const userDomain = this.userFactory.create({
      ...payload,
    })

    const saved = await this.userRepository.save(userDomain)

    userDomain.commit()

    return new CreateUserResult(saved)
  }
}
