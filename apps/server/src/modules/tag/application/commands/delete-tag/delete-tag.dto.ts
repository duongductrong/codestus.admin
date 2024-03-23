import { ApiProperty } from "@nestjs/swagger"
import { IsExists } from "@server/core/modules/validator"
import { TagEntity } from "@server/modules/tag/infras/entities/tag.entity"
import { IsDefined, IsNotEmpty, IsNumber } from "class-validator"
import { DeleteTagCommand, DeleteTagResult } from "./delete-tag.handler"

export class DeleteTagRequestDto extends DeleteTagCommand {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsExists({ entity: TagEntity, field: "id" }, {})
  id: number
}

export class DeleteTagResponseDto extends DeleteTagResult {}
