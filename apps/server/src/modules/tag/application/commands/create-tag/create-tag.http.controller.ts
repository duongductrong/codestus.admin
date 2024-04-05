import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { CreateTagRequestDto, CreateTagResponseDto } from "./create-tag.dto"
import { CreateTagCommand, CreateTagResult } from "./create-tag.handler"

@ApiTags(routes.v1.tags.apiTag)
@Controller({ version: routes.v1.version })
export class CreateTagHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Post(routes.v1.tags.create)
  @ApiOkResponse({ type: SignalResponseDto(CreateTagResponseDto) })
  @HttpCode(HttpStatus.OK)
  @Auth()
  async run(@Body() body: CreateTagRequestDto) {
    const result = await this.commandBus.execute<CreateTagCommand, CreateTagResult>(
      new CreateTagCommand(body),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
