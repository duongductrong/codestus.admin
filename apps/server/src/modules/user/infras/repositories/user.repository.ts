import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserEntity } from "../entities/user.entity"
import { UserRepositoryPort } from "./user.repository.port"

@Injectable()
export class UserRepository extends Repository<UserEntity> implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
