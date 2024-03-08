import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateUserCommand } from "./create-user.command"
import { UserEntity } from "../../entities/user.entity"

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, UserEntity> {
  execute(command: CreateUserCommand): Promise<UserEntity> {
    throw new Error("Method not implemented.")
  }
}
