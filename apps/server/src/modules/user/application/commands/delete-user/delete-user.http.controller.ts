import { Controller, Delete, Inject, Param } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBody, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { DeleteUserCommand } from "./delete-user.handler"

@ApiTags(routes.v1.users.apiTag)
@Controller({ version: routes.v1.version })
export class DeleteUserHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Delete(routes.v1.users.delete)
  @Auth()
  async run(@Param("id") id: number) {
    const result = await this.commandBus.execute(new DeleteUserCommand({ id }))
    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
