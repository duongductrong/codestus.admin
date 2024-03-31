import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Query } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { arrayFromComma } from "@server/core/utils/array"
import { GetPostRequestDto, GetPostResponseDto } from "./get-post.dto"
import { GetPostQuery, GetPostResult } from "./get-post.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class GetPostHttpController {
  @Inject() private readonly queryBus: QueryBus

  @Get(routes.v1.posts.detail)
  @ApiOkResponse({ type: SignalResponseDto(GetPostResponseDto) })
  @ApiNotFoundResponse({ type: SignalErrorDto() })
  @HttpCode(HttpStatus.OK)
  async run(@Param("id") id: number | string, @Query() query: GetPostRequestDto) {
    const result = await this.queryBus.execute<GetPostQuery, GetPostResult>(
      new GetPostQuery({ id, relations: arrayFromComma(query.relations) }),
    )

    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
