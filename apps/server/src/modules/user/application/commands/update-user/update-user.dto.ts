import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { UpdateUserCommand } from "./update-user.handler"

export class UpdateUserRequestDto implements Omit<UpdateUserCommand, "id"> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string
}

export class UpdateUserResponseDto {}
