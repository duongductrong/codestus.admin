import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Request } from "express"
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from "./refresh-token.dto"
import { RefreshTokenCommand, RefreshTokenResult } from "./refresh-token.handler"

@ApiTags(routes.v1.auth.apiTag)
@Controller({ version: routes.v1.version })
export class RefreshTokenHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.v1.auth.refreshToken)
  @ApiOkResponse({ type: SignalResponseDto(RefreshTokenResponseDto) })
  @ApiBadRequestResponse({ type: SignalErrorDto() })
  @HttpCode(HttpStatus.OK)
  async run(@Req() request: Request, @Body() body: RefreshTokenRequestDto) {
    const [bear, token] = request?.headers?.authorization?.split(" ") || []

    if (!token) throw new BadRequestException(GENERAL_MESSAGES.TOKEN_INVALID)

    const result = await this.commandBus.execute<RefreshTokenCommand, RefreshTokenResult>(
      new RefreshTokenCommand({ ...body, token }),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
