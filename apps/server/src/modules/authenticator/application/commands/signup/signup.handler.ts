import { Inject } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { IUserFactory } from "@server/modules/user/domain/user.factory"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { USER_FACTORY, USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { omit } from "lodash"

export class SignUpCommand implements ICommand {
  email: string

  password: string

  constructor(props: SignUpCommand) {
    Object.assign(this, props)
  }
}

export class SignUpResult extends UserEntity {
  constructor(props: UserEntity) {
    super()
    Object.assign(this, omit(props, ["password"]))
  }
}

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand, SignUpResult> {
  @Inject(USER_REPOSITORY) userRepo: UserRepositoryPort

  @Inject(USER_FACTORY) private readonly userFactory: IUserFactory

  async execute(command: SignUpCommand): Promise<SignUpResult> {
    const { email, password } = command

    const user = await this.userFactory.create({ email, password })

    const createdUser = await this.userRepo.save(user)

    return new SignUpResult(createdUser)
  }
}
