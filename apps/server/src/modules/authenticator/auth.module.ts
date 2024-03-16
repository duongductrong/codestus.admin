import { Module, Provider } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { UserFactory } from "../user/domain/user.factory"
import { UserEntity } from "../user/infras/entities/user.entity"
import { UserRepository } from "../user/infras/repositories/user.repository"
import { USER_FACTORY, USER_MAPPER, USER_REPOSITORY } from "../user/user.di-tokens"
import { Controllers } from "./application"
import { CommandHandlers } from "./application/commands"
import { UserMapper } from "../user/user.mapper"

const Repositories: Provider[] = [{ provide: USER_REPOSITORY, useClass: UserRepository }]
const Services: Provider[] = [HashService, { provide: USER_FACTORY, useClass: UserFactory }]
const Mappers: Provider[] = [{ provide: USER_MAPPER, useClass: UserMapper }]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [...Mappers, ...Services, ...Repositories, ...CommandHandlers],
  controllers: Controllers,
  exports: [],
})
export class AuthModule {}
