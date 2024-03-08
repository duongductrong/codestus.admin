import { ICommand } from "@nestjs/cqrs"
import { CreateUserRequestDto } from "./create-user.request.dto"

export class CreateUserCommand extends CreateUserRequestDto implements ICommand {
  constructor(props: CreateUserRequestDto) {
    super()
    this.email = props.email
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.password = props.password
  }
}
