import { Controller, Delete, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { GetPostQuery, GetPostResult } from "../../queries/get-post/get-post.handler"
import { DeletePostCommand, DeletePostResult } from "./delete-post.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class DeletePostHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Inject() private readonly queryBus: QueryBus

  @Delete(routes.v1.posts.delete)
  @ApiOkResponse({ type: SignalResponseDto(DeletePostResult) })
  @HttpCode(HttpStatus.OK)
  @Auth()
  async run(@Param("id") id: number) {
    const post = await this.queryBus.execute<GetPostQuery, GetPostResult>(new GetPostQuery({ id }))

    const result = await this.commandBus.execute<DeletePostCommand, DeletePostResult>(
      new DeletePostCommand({ id: Number(post.id) }),
    )

    return SignalBuilder.create()
      .setData(result)
      .setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS)
      .build()
  }
}
