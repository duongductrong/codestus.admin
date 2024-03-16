import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "@server/core/libs/ddd/repository.base"
import { User } from "../../domain/user"
import { UserRepositoryPort } from "../../domain/user.repository.port"
import { USER_MAPPER } from "../../user.di-tokens"
import { UserMapper } from "../../user.mapper"
import { UserEntity } from "../entities/user.entity"

@Injectable()
export class UserRepository extends Repository<UserEntity, User> implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity, User>,
    @Inject(USER_MAPPER) private readonly userMapper: UserMapper,
  ) {
    super(repository.target, repository.manager, repository.queryRunner, userMapper)
  }
}
