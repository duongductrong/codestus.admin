import { Body, Controller, Post } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { CreateUserRequestDto } from "./create-user.dto"
import { CreateUserCommand } from "./create-user.handler"

@ApiTags(routes.v1.users.apiTag)
@Controller({ version: routes.v1.version })
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.v1.users.root)
  @Auth()
  async run(@Body() data: CreateUserRequestDto) {
    try {
      const result = await this.commandBus.execute(new CreateUserCommand(data))
      return SignalBuilder.create().setData(result).setMessage("Create a user successful").build()
    } catch (error) {
      return SignalBuilder.create().throwException(error)
    }
  }
}
