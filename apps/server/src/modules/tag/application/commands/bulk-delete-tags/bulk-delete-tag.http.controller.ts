import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { BulkDeleteTagRequestDto, BulkDeleteTagResponseDto } from "./bulk-delete-tag.dto"
import { BulkDeleteTagCommand, BulkDeleteTagResult } from "./bulk-delete-tag.handler"

@ApiTags(routes.v1.tags.apiTag)
@Controller({ version: routes.v1.version })
export class BulkDeleteTagHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Post(routes.v1.tags.bulkDelete)
  @ApiOkResponse({ type: SignalResponseDto(BulkDeleteTagResponseDto) })
  @HttpCode(HttpStatus.OK)
  @Auth()
  async run(@Body() body: BulkDeleteTagRequestDto) {
    const result = await this.commandBus.execute<BulkDeleteTagCommand, BulkDeleteTagResult>(
      new BulkDeleteTagCommand(body),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
