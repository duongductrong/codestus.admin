import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { TagEntity } from "@server/modules/tag/infras/entities/tag.entity"
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Transform } from "class-transformer"
import { UpdateTagCommand, UpdateTagResult } from "./update-tag.handler"

export class UpdateTagRequestDto extends UpdateTagCommand {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUnique({ entity: TagEntity, field: "slug", ignore: "id" })
  slug: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string
}

export class UpdateTagResponseDto extends UpdateTagResult {}
