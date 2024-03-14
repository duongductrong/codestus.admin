import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { IsString } from "class-validator"
import { IsExists } from "@server/core/modules/validator"
import { GetUserQuery } from "./get-user.handler"

export class GetUserRequestDto implements GetUserQuery {
  @IsString()
  @IsExists({ entity: UserEntity, field: "id" }, {})
  identifier: string
}

export class GetUserResponseDto extends UserEntity {}
