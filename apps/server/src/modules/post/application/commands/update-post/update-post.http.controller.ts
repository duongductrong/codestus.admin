import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
} from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UpdatePostRequestDto } from "./update-post.dto"
import { UpdatePostCommand, UpdatePostResult } from "./update-post.handler"

@ApiTags(routes.v1.posts.apiTag)
@Controller({ version: routes.v1.version })
export class UpdatePostHttpController {
  @Inject() private readonly commandBus: CommandBus

  @Put(routes.v1.posts.update)
  @ApiOkResponse({ type: SignalResponseDto(UpdatePostRequestDto) })
  @ApiBadRequestResponse({ type: SignalErrorDto(BadRequestException) })
  @ApiForbiddenResponse({ type: SignalErrorDto(ForbiddenException) })
  @HttpCode(HttpStatus.OK)
  async run(@Param("id") id: number, @Body() body: UpdatePostRequestDto) {
    if (id !== body.id) throw new ForbiddenException(GENERAL_MESSAGES.FORBIDDEN)

    const result = await this.commandBus.execute<UpdatePostCommand, UpdatePostResult>(
      new UpdatePostCommand({ ...body, id, shouldStrictValidate: false }),
    )
    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.QUERY_SUCCESS).build()
  }
}
