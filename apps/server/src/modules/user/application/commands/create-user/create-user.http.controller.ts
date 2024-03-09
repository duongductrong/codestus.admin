import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  InternalServerErrorException,
  Post,
  UseInterceptors,
} from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { routes } from "@server/configs/routes.config"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { CreateUserCommand } from "./create-user.handler"
import { CreateUserRequestDto } from "./create-user.dto"

@ApiTags(routes.v1.users.apiTag)
@Controller({ version: routes.v1.version })
@UseInterceptors(ClassSerializerInterceptor)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routes.v1.users.root)
  async root(@Body() data: CreateUserRequestDto) {
    try {
      const result = await this.commandBus.execute(new CreateUserCommand(data))
      return SignalBuilder.create().setData(result).setMessage("Create a user successful").build()
    } catch (error) {
      return SignalBuilder.create().throwException(error)
    }
  }
}
