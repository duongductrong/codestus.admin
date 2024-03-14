import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { IsString, IsOptional, IsEmail, IsStrongPassword } from "class-validator"
import { CreateUserCommand } from "./create-user.handler"

export class CreateUserRequestDto implements CreateUserCommand {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string

  @IsString()
  @IsEmail()
  @IsUnique({ entity: UserEntity })
  @ApiProperty()
  email: string

  @IsString()
  @IsStrongPassword()
  @ApiProperty()
  password: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar?: string | undefined
}
