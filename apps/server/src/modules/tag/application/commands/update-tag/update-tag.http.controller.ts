import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
} from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UpdateTagRequestDto, UpdateTagResponseDto } from "./update-tag.dto"
import { UpdateTagCommand, UpdateTagResult } from "./update-tag.handler"

@ApiTags(routes.v1.tags.apiTag)
@Controller({ version: routes.v1.version })
export class UpdateTagHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Put(routes.v1.tags.update)
  @ApiOkResponse({ type: SignalResponseDto(UpdateTagResponseDto) })
  @HttpCode(HttpStatus.OK)
  async run(@Param("id") id: number, @Body() body: UpdateTagRequestDto) {
    if (id !== body.id) throw new ForbiddenException(GENERAL_MESSAGES.FORBIDDEN)

    const result = await this.commandBus.execute<UpdateTagCommand, UpdateTagResult>(
      new UpdateTagCommand({ ...body, id }),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
