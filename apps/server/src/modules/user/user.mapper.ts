import { Mapper } from "@server/core/libs/ddd"
import { UserEntity } from "./infras/entities/user.entity"
import { User, UserClass } from "./domain/user"

export class UserMapper implements Mapper<UserEntity, User> {
  toEntity(model: UserEntity): User {
    return new UserClass(model)
  }
}
