import { IsArray, IsDefined, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { BulkDeleteTagCommand } from "./bulk-delete-tag.handler"

export class BulkDeleteTagRequestDto extends BulkDeleteTagCommand {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  ids: number[]
}

export class BulkDeleteTagResponseDto {}
