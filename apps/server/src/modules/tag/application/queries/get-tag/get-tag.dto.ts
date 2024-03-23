import { IsOptional, IsString } from "class-validator"
import { GetTagQuery, GetTagResult } from "./get-tag.handler"

export class GetTagRequestDto implements Omit<GetTagQuery, "id" | "relations"> {
  @IsString()
  @IsOptional()
  relations?: string
}

export class GetTagResponseDto extends GetTagResult {}
