import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { LoginRequestDto, LoginResponseDto } from "./login.dto"
import { LoginCommand, LoginResult } from "./login.handler"

@ApiTags(routes.v1.auth.apiTag)
@Controller({ version: routes.v1.version })
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.v1.auth.login)
  @ApiOkResponse({ type: SignalResponseDto(LoginResponseDto) })
  @ApiBadRequestResponse({ type: SignalErrorDto() })
  @ApiNotFoundResponse({ type: SignalErrorDto() })
  @HttpCode(HttpStatus.OK)
  async run(@Body() credentials: LoginRequestDto) {
    const result = await this.commandBus.execute<LoginCommand, LoginResult>(
      new LoginCommand({ identifier: credentials.identifier, password: credentials.password }),
    )

    return SignalBuilder.create().setData(result).setMessage("Login successful").build()
  }
}
