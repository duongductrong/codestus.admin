import { Transform, Type } from "class-transformer"
import { IsArray, IsDefined, ValidateNested } from "class-validator"
import { isArray } from "lodash"
import { BulkDeleteTagCommand } from "./bulk-delete-tag.handler"

export class BulkDeleteTagRequestDto extends BulkDeleteTagCommand {
  @IsDefined()
  @IsArray()
  @Type(() => Number)
  @Transform(({ value }) => (isArray(value) ? value.map((curVal) => Number(curVal)) : value))
  ids: number[]
}

export class BulkDeleteTagResponseDto {}
