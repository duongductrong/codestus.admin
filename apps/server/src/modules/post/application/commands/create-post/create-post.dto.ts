import { ApiProperty } from "@nestjs/swagger"
import { IsUnique } from "@server/core/modules/validator"
import { PostProps } from "@server/modules/post/domain/post"
import { PostEntity } from "@server/modules/post/infras/entities/post.entity"
import { Type } from "class-transformer"
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { CreatePostCommand, CreatePostResult } from "./create-post.handler"

export class CreatePostRequestDto implements CreatePostCommand {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnail?: string | undefined

  @ApiProperty()
  @IsString()
  @IsUnique({ entity: PostEntity, field: "slug" })
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

  @ApiProperty()
  @IsNumber()
  userId: number

  @ApiProperty()
  @IsArray()
  @Type(() => Number)
  tagIds: number[]
}

export class CreatePostResponseDto extends CreatePostResult {}
