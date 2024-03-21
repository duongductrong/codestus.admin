import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { PostEntity } from "@server/modules/post/infras/entities/post.entity"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { UpdatePostCommand } from "./update-post.handler"

export class UpdatePostRequestDto implements Omit<UpdatePostCommand, "shouldStrictValidate"> {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnail?: string

  @ApiProperty()
  @IsString()
  @IsUnique({ entity: PostEntity, field: "slug", ignore: "id" })
  slug: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string

  @ApiProperty()
  @IsNumber()
  status: number

  // @ApiProperty()
  // @IsNumber()
  // userId: number

  @ApiProperty()
  @IsArray()
  @Type(() => Number)
  tagIds: number[]
}

export class UpdatePostResponseDto {}
