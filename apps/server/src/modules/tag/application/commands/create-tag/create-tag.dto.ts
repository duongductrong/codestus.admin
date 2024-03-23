import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { TagEntity } from "@server/modules/tag/infras/entities/tag.entity"
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { CreateTagCommand, CreateTagResult } from "./create-tag.handler"

export class CreateTagRequestDto extends CreateTagCommand {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUnique({ entity: TagEntity, field: "slug" })
  slug: string

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsOptional()
  description?: string
}

export class CreateTagResponseDto extends CreateTagResult {}
