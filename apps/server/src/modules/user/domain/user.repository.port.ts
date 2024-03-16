import { Repository } from "@server/core/libs/ddd/repository.base"
import { UserEntity } from "../infras/entities/user.entity"
import { User } from "./user"

export interface UserRepositoryPort extends Repository<UserEntity, User> {}
