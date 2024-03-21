import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { GetPostQuery, GetPostResult } from "./get-post.handler"

export class GetPostRequestDto implements Omit<GetPostQuery, "relations" | "id"> {
  @ApiProperty({ description: "Includes: user,tags" })
  @IsString()
  @IsOptional()
  relations?: string
}

export class GetPostResponseDto extends GetPostResult {}
