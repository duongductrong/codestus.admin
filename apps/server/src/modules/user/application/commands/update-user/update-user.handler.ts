import { Inject, NotFoundException } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UserProps } from "@server/modules/user/domain/user"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"

export class UpdateUserCommand implements ICommand {
  id: number

  name?: string

  avatar?: string

  constructor(props: UpdateUserCommand) {
    Object.assign(this, props)
  }
}

export class UpdateUserResult implements Partial<UserProps> {
  id: number

  email: string

  name?: string | null | undefined

  emailVerifiedAt?: Date | undefined

  rememberToken?: string | undefined

  provider?: string | undefined

  providerId?: string | undefined

  avatar?: string | undefined

  createdAt?: Date | undefined

  updatedAt?: Date | undefined

  constructor(props: UpdateUserResult) {
    Object.assign(this, props)
  }
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, UpdateUserResult> {
  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  async execute({ id, ...data }: UpdateUserCommand): Promise<UpdateUserResult> {
    const user = await this.userRepo.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)
    }

    user.setName(data.name)

    const userUpdated = await this.userRepo.save(user)

    user.commit()

    return new UpdateUserResult(userUpdated)
  }
}
