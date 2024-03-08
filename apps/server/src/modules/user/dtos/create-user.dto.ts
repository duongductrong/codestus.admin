import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { UserEntity } from "../entities/user.entity"
import { IUser } from "../interfaces"

export class CreateUserDto implements Pick<IUser, "firstName" | "lastName" | "email" | "password"> {
  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName?: string

  @IsString()
  @IsEmail()
  @IsUnique({ entity: UserEntity })
  @ApiProperty()
  email: string

  @IsString()
  @IsStrongPassword()
  @ApiProperty()
  password: string
}
