import { Inject, NotFoundException } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"

export class DeleteUserCommand implements ICommand {
  id: number

  isSoftDelete?: boolean

  constructor(props: DeleteUserCommand) {
    Object.assign(this, props)
  }
}

export class DeleteUserResult {}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, DeleteUserResult> {
  @Inject(USER_REPOSITORY) private userRepo: UserRepositoryPort

  async execute({ id, isSoftDelete = false }: DeleteUserCommand): Promise<DeleteUserResult> {
    if (!id) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    const user = await this.userRepo.findOne({ where: { id } })

    if (!user) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    console.log(user)

    const userProps = user.getProps()

    if (isSoftDelete) {
      const softDeleted = await this.userRepo.softDelete(userProps.id)

      return softDeleted
    }

    return this.userRepo.delete(userProps.id)
  }
}
