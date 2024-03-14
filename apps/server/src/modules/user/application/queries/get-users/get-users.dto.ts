import { BasePaginationQuery } from "@server/core/query.base"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { GetUsersQuery } from "./get-users.handler"

export class GetUsersRequestDto extends BasePaginationQuery implements GetUsersQuery {}

export class GetUsersResponseDto extends UserEntity {}
