import { Mapper } from "@server/core/libs/ddd"
import { UserEntity } from "./infras/entities/user.entity"
import { User, UserClass } from "./domain/user"

export interface IUserMapper extends Mapper<UserEntity, User> {}

export class UserMapper implements IUserMapper {
  toEntity(model: UserEntity): User {
    return new UserClass(model)
  }
}
