import { Controller, Get, Inject, Param, Query } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { arrayFromComma } from "@server/core/utils/array"
import { GetTagRequestDto } from "./get-tag.dto"
import { GetTagQuery, GetTagResult } from "./get-tag.handler"

@ApiTags(routes.v1.tags.apiTag)
@Controller({ version: routes.v1.version })
export class GetTagHttpController {
  @Inject() private readonly queryBus: QueryBus

  @Get(routes.v1.tags.detail)
  async run(@Param("id") id: string | number, @Query() query: GetTagRequestDto) {
    const result = await this.queryBus.execute<GetTagQuery, GetTagResult>(
      new GetTagQuery({ id, relations: arrayFromComma(query.relations) }),
    )

    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
