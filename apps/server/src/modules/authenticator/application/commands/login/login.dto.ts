import { ApiProperty } from "@nestjs/swagger"
import { IsExists } from "@server/core/modules/validator"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { IsEmail, IsString, IsStrongPassword } from "class-validator"
import { LoginCommand, LoginResult } from "./login.handler"

export class LoginRequestDto implements LoginCommand {
  @IsString()
  @IsEmail()
  @IsExists({ entity: UserEntity, field: "email" })
  identifier: string

  @IsString()
  @IsStrongPassword()
  password: string
}

export class LoginResponseDto implements LoginResult {
  @ApiProperty()
  @IsString()
  jwtToken: string

  @ApiProperty()
  @IsString()
  expiredAt: string
}
