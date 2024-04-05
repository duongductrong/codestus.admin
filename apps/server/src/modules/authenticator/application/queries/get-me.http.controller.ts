import { Controller, Get, HttpCode, HttpStatus, Inject, Query, Req } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Request } from "express"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { Auth } from "../../infras/decorators/auth.decorator"
import { GetMeRequestDto, GetMeResultDto } from "./get-me.dto"
import { GetMeQuery, GetMeResult } from "./get-me.handler"

@ApiTags(routes.v1.auth.apiTag)
@Controller({ version: routes.v1.version })
export class GetMeHttpController {
  @Inject() private readonly queryBus: QueryBus

  @Get(routes.v1.auth.getMe)
  @ApiOkResponse({ type: SignalResponseDto(GetMeResultDto) })
  @HttpCode(HttpStatus.OK)
  @Auth()
  async getMe(@Req() request: Request, @Query() query: GetMeRequestDto) {
    const result = await this.queryBus.execute<GetMeQuery, GetMeResult>(
      new GetMeQuery({ id: request.user.id }),
    )

    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
