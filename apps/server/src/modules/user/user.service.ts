import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { Repository } from "typeorm"
import { CommandBus } from "@nestjs/cqrs"
import { CreateUserDto } from "./dtos"
import { UserEntity } from "./entities/user.entity"
import { CreateUserCommand } from "./application/commands/create-user.command"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashService: HashService,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  async findOne(emailOrId: string) {
    const userEntityMetadata = UserEntity.getRepository().metadata
    return this.userRepository
      .createQueryBuilder(userEntityMetadata.tableName)
      .where(`${userEntityMetadata.tableName}.id= :id`, { id: emailOrId })
      .orWhere(`${userEntityMetadata.tableName}.email= :email`, { email: emailOrId })
      .getOne()
  }

  async create(payload: CreateUserDto): Promise<UserEntity> {
    const data = payload

    return this.commandBus.execute(new CreateUserCommand(data))

    // data.password = await this.hashService.make(payload.password)

    // const user = this.userRepository.create(data)

    // return this.userRepository.save(user)
  }

  async verify(emailOrId: string) {
    const verified = await this.userRepository
      .createQueryBuilder(UserEntity.name)
      .update(UserEntity)
      .set({ emailVerifiedAt: new Date() })
      .where(`${UserEntity.getRepository().metadata.tableName}.id= :id`, { id: emailOrId })
      .orWhere(`${UserEntity.getRepository().metadata.tableName}.email= :email`, {
        email: emailOrId,
      })
      .execute()

    return !!verified.affected
  }

  async changePassword(emailOrId: string, newPassword: string) {
    return this.userRepository
      .createQueryBuilder(UserEntity.name)
      .update(UserEntity)
      .set({ password: newPassword })
      .where(`${UserEntity.name}.id= :id`, { id: emailOrId })
      .orWhere(`${UserEntity.name}.email = :email`, { email: emailOrId })
      .execute()
  }
}
