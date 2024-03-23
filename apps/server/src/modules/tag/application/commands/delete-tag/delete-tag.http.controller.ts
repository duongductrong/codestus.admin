import { Controller, Delete, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { GetTagQuery, GetTagResult } from "../../queries/get-tag/get-tag.handler"
import { DeleteTagResponseDto } from "./delete-tag.dto"
import { DeleteTagCommand, DeleteTagResult } from "./delete-tag.handler"

@ApiTags(routes.v1.tags.apiTag)
@Controller({ version: routes.v1.version })
export class DeleteTagHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Inject() private readonly queryBus: QueryBus

  @Delete(routes.v1.tags.delete)
  @ApiOkResponse({ type: SignalResponseDto(DeleteTagResponseDto) })
  @HttpCode(HttpStatus.OK)
  async run(@Param("id") id: number) {
    const tag = await this.queryBus.execute<GetTagQuery, GetTagResult>(new GetTagQuery({ id }))

    const result = await this.commandBus.execute<DeleteTagCommand, DeleteTagResult>(
      new DeleteTagCommand({ id: tag.id }),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
