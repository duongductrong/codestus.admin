import { Body, Controller, Inject, Param, Put } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { routes } from "@server/configs/routes.config"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UpdateUserRequestDto } from "./update-user.dto"
import { UpdateUserCommand } from "./update-user.handler"

@Controller({ version: routes.v1.version })
export class UpdateUserHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Put(routes.v1.users.update)
  async run(@Param() id: string, @Body() data: UpdateUserRequestDto) {
    const result = await this.commandBus.execute(new UpdateUserCommand())
    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS)
  }
}
