import { Inject } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"

export class UpdateUserCommand implements ICommand {}

export class UpdateUserResult {}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, UpdateUserResult> {
  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  execute(command: UpdateUserCommand): Promise<UpdateUserResult> {
    throw new Error("Method not implemented.")
  }
}
