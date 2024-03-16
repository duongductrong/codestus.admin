import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { SignUpRequestDto, SignUpResponseDto } from "./signup.dto"
import { SignUpCommand, SignUpResult } from "./signup.handler"

@ApiTags(routes.v1.auth.apiTag)
@Controller({ version: routes.v1.version })
export class SignUpHttpController {
  @Inject(CommandBus) commandBus: CommandBus

  @HttpCode(HttpStatus.OK)
  @Post(routes.v1.auth.signUp)
  @ApiBody({ type: SignUpRequestDto })
  @ApiOkResponse({ type: SignalResponseDto(SignUpResponseDto) })
  async run(@Body() data: SignUpRequestDto) {
    const result = await this.commandBus.execute<SignUpCommand, SignUpResult>(
      new SignUpCommand({ email: data.email, password: data.password }),
    )

    return SignalBuilder.create().setData(result).setMessage(GENERAL_MESSAGES.OPERATION_SUCCESS).build()
  }
}
