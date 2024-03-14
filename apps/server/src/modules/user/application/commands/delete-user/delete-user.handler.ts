import { Inject } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "@server/modules/user/infras/repositories/user.repository"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"

export class DeleteUserCommand implements ICommand {
  id: string

  isSoftDelete?: boolean
}

export class DeleteUserResult {}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<ICommand, DeleteUserResult> {
  @Inject(USER_REPOSITORY) private userRepo: UserRepository

  execute(command: ICommand): Promise<DeleteUserResult> {
    throw new Error("Method not implemented.")
  }
}
