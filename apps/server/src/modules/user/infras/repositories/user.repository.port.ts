import { Repository } from "typeorm"
import { UserEntity } from "../entities/user.entity"

export interface UserRepositoryPort extends Repository<UserEntity> {}
