import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Put } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UpdateUserRequestDto, UpdateUserResponseDto } from "./update-user.dto"
import { UpdateUserCommand } from "./update-user.handler"

@ApiTags(routes.v1.users.apiTag)
@Controller({ version: routes.v1.version })
export class UpdateUserHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Put(routes.v1.users.update)
  @ApiBody({ type: UpdateUserRequestDto })
  @ApiParam({ name: "id", schema: { type: "number" } })
  @ApiOkResponse({ type: SignalResponseDto(UpdateUserResponseDto) })
  @HttpCode(HttpStatus.OK)
  async run(@Param("id") id: number, @Body() data: UpdateUserRequestDto) {
    const result = await this.commandBus.execute(new UpdateUserCommand({ id, ...data }))
    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS)
  }
}
