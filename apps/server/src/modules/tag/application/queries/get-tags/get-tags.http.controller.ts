import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { GetTagsRequestDto, GetTagsResponseDto } from "./get-tags.dto"
import { GetTagsQuery, GetTagsResult } from "./get-tags.handler"

@ApiTags(routes.v1.tags.apiTag)
@Controller({ version: routes.v1.version })
export class GetTagsHttpController {
  @Inject() private readonly queryBus: QueryBus

  @Get(routes.v1.tags.root)
  @ApiOkResponse({ type: SignalResponseDto([GetTagsResponseDto]) })
  @HttpCode(HttpStatus.OK)
  async run(@Query() query: GetTagsRequestDto) {
    const { data: result, count } = await this.queryBus.execute<GetTagsQuery, GetTagsResult>(
      new GetTagsQuery(query),
    )
    return SignalBuilder.create()
      .setData(result)
      .setMeta({
        total: count,
        page: query.page,
        size: query.limit,
      })
      .setMessage(GENERAL_MESSAGES.QUERY_SUCCESS)
      .build()
  }
}
