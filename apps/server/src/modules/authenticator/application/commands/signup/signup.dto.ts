import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { IsEmail, IsString, IsStrongPassword } from "class-validator"
import { SignUpCommand, SignUpResult } from "./signup.handler"

export class SignUpRequestDto implements Pick<SignUpCommand, "email" | "password"> {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsUnique({ entity: UserEntity, field: "email" })
  email: string

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  password: string
}

export class SignUpResponseDto extends SignUpResult {}
