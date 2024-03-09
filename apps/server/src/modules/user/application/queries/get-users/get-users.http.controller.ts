import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GetUsersCountQuery } from "../get-users-count/get-users-count.handler"
import { GetUsersRequestDto, GetUsersResponseDto } from "./get-users.dto"
import { GetUsersQuery, GetUsersResult } from "./get-users.handler"

@ApiTags(routes.v1.users.apiTag)
@Controller({ version: routes.v1.version })
@UseInterceptors(ClassSerializerInterceptor)
export class GetUsersHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routes.v1.users.root)
  @ApiOkResponse({ type: SignalResponseDto(GetUsersResponseDto) })
  async execute(@Query() payload: GetUsersRequestDto) {
    try {
      const [result, total] = await Promise.all([
        this.queryBus.execute<GetUsersQuery, GetUsersResult>(new GetUsersQuery(payload)),
        this.queryBus.execute<GetUsersCountQuery, number>(new GetUsersCountQuery()),
      ])

      return SignalBuilder.create()
        .setData(result)
        .setMeta({ page: payload.page, size: payload.limit, total })
        .setMessage("Get users successful")
        .build()
    } catch (error) {
      return SignalBuilder.create().throwException(error)
    }
  }
}
