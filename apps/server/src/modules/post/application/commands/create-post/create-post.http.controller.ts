import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { Auth } from "@server/modules/authenticator/infras/decorators/auth.decorator"
import { Request } from "express"
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
  @Auth()
  async run(@Body() body: CreatePostRequestDto, @Req() request: Request) {
    const result = await this.commandBus.execute<CreatePostCommand, CreatePostResult>(
      new CreatePostCommand(Object.assign(body, { userId: request.user.id })),
    )
    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
