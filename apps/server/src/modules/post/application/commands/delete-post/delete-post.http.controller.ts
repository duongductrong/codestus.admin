import { Controller, Delete, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { DeletePostCommand, DeletePostResult } from "./delete-post.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class DeletePostHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Delete(routes.v1.posts.delete)
  @ApiOkResponse({ type: SignalResponseDto(DeletePostResult) })
  @HttpCode(HttpStatus.OK)
  async run(@Param("id") id: number) {
    const result = await this.commandBus.execute<DeletePostCommand, DeletePostResult>(
      new DeletePostCommand({ id: Number(id) }),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
