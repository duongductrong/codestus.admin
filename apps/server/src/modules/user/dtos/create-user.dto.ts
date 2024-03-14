import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { UserEntity } from "../infras/entities/user.entity"
import { IUser } from "../interfaces"

export class CreateUserDto implements Pick<IUser, "name" | "email" | "password" | "avatar"> {
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
  @ApiProperty()
  avatar?: string | undefined
}
