import { Module, Provider } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { UserFactory } from "../user/domain/user.factory"
import { UserEntity } from "../user/infras/entities/user.entity"
import { UserRepository } from "../user/infras/repositories/user.repository"
import { USER_FACTORY, USER_REPOSITORY } from "../user/user.di-tokens"
import { Controllers } from "./application"
import { CommandHandlers } from "./application/commands"

const Repositories: Provider[] = [{ provide: USER_REPOSITORY, useClass: UserRepository }]
const Services: Provider[] = [HashService, { provide: USER_FACTORY, useClass: UserFactory }]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [...Services, ...Repositories, ...CommandHandlers],
  controllers: Controllers,
  exports: [],
})
export class AuthModule {}
