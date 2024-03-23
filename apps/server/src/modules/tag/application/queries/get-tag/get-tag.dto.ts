import { IsOptional, IsString } from "class-validator"
import { GetTagQuery } from "./get-tag.handler"

export class GetTagRequestDto implements Omit<GetTagQuery, "id" | "relations"> {
  @IsString()
  @IsOptional()
  relations?: string
}

export class GetTagResponseDto {}
