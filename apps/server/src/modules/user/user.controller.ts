import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from "@nestjs/swagger"
import { I18nTranslations } from "@server/@types/i18n"
import { SignalErrorDto } from "@server/core/classes/signal/dtos/signal-error.dto"
import { SignalResponseDto } from "@server/core/classes/signal/dtos/signal-response.dto"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { omit } from "lodash"
import { I18n, I18nContext } from "nestjs-i18n"
import { CreateUserDto } from "./dtos"
import { CreateUserResponseDto } from "./dtos/create-user.response.dto"
import { VerifyUserResponseDto } from "./dtos/verify-user-response.dto"
import { UserEntity } from "./entities/user.entity"
import { UserService } from "./user.service"

@ApiTags("User")
@Controller({ path: "users", version: ["1"] })
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: "The resources were returned successfully" })
  @ApiForbiddenResponse({ description: "Unauthorized Request" })
  async findAll(@I18n() i18n: I18nContext<I18nTranslations>) {
    try {
      const users = await this.userService.findAll()
      return SignalBuilder.create()
        .setData(users)
        .setMessage("Ok")
        .setMeta({ page: 1, size: 2, total: 3 })
        .build()
    } catch (error) {
      throw new InternalServerErrorException(error.message, { cause: error.stack })
    }
  }

  @Post()
  @ApiOkResponse({ type: SignalResponseDto(CreateUserResponseDto) })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto)
      return SignalBuilder.create().setData(user).setMessage("Ok").build()
    } catch (error) {
      throw new InternalServerErrorException(error.message, { cause: error.stack })
    }
  }

  @Put(":id/verify")
  @ApiOkResponse({ type: SignalResponseDto(VerifyUserResponseDto) })
  @ApiBadRequestResponse({ type: SignalErrorDto(OmitType(UserEntity, ["password"])) })
  async verify(@Param("id") emailOrId: string) {
    const user = await this.userService.findOne(emailOrId)

    if (!user) throw new NotFoundException("Not found", { cause: {} })
    if (user.emailVerifiedAt) {
      throw new BadRequestException("The email has been verified", {
        cause: omit(user, ["password"]),
      })
    }

    try {
      const verified = await this.userService.verify(emailOrId)
      return SignalBuilder.create().setData(verified).setMessage("Ok").build()
    } catch (error) {
      throw new InternalServerErrorException(error.message, { cause: error.stacks })
    }
  }
}
