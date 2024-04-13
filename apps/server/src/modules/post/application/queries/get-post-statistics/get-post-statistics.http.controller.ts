import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { GetPostStatisticsRequestDto, GetPostStatisticsResultDto } from "./get-post-statistics.dto"
import { GetPostStatisticsQuery, GetPostStatisticsResult } from "./get-post-statistics.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class GetPostStatisticsHttpController {
  @Inject() private readonly queryBus: QueryBus

  @Get(routes.v1.posts.statistics)
  @ApiOkResponse({ type: SignalResponseDto([GetPostStatisticsResultDto]) })
  @HttpCode(HttpStatus.OK)
  @Auth()
  async run(@Query() query: GetPostStatisticsRequestDto) {
    const data = await this.queryBus.execute<GetPostStatisticsQuery, GetPostStatisticsResult>(
      new GetPostStatisticsQuery({}),
    )

    return SignalBuilder.create().setData(data).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
