import { UserEntity } from "@server/modules/user/entities/user.entity"
import { GetUsersQuery, GetUsersResult } from "./get-users.handler"

export class GetUsersRequestDto extends GetUsersQuery {
  constructor(props: GetUsersQuery) {
    super(props)
  }
}

export class GetUsersResponseDto extends UserEntity {}
