import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { CreatePostRequestDto, CreatePostResponseDto } from "./create-post.dto"
import { CreatePostCommand, CreatePostResult } from "./create-post.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class CreatePostHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Post(routes.v1.posts.create)
  @ApiOkResponse({ type: SignalResponseDto(CreatePostResponseDto) })
  @ApiBadRequestResponse({ type: SignalErrorDto() })
  @HttpCode(HttpStatus.OK)
  async run(@Body() body: CreatePostRequestDto) {
    const result = await this.commandBus.execute<CreatePostCommand, CreatePostResult>(
      new CreatePostCommand(body),
    )
    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
