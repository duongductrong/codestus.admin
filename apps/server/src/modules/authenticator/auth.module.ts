import { Module, Provider } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { UserFactory } from "../user/domain/user.factory"
import { UserEntity } from "../user/infras/entities/user.entity"
import { UserRepository } from "../user/infras/repositories/user.repository"
import { USER_FACTORY, USER_MAPPER, USER_REPOSITORY } from "../user/user.di-tokens"
import { UserMapper } from "../user/user.mapper"
import { LoginHandler } from "./application/commands/login/login.handler"
import { LoginHttpController } from "./application/commands/login/login.http.controller"
import { SignUpHandler } from "./application/commands/signup/signup.handler"
import { SignUpHttpController } from "./application/commands/signup/signup.http.controller"
import { GetMeHandler } from "./application/queries/get-me.handler"
import { GetMeHttpController } from "./application/queries/get-me.http.controller"

const Repositories: Provider[] = [{ provide: USER_REPOSITORY, useClass: UserRepository }]
const Services: Provider[] = [HashService, { provide: USER_FACTORY, useClass: UserFactory }]
const Mappers: Provider[] = [{ provide: USER_MAPPER, useClass: UserMapper }]
const Commands = [LoginHandler, SignUpHandler]
const Queries = [GetMeHandler]
const Controllers = [LoginHttpController, SignUpHttpController, GetMeHttpController]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [...Mappers, ...Services, ...Repositories, ...Commands, ...Queries],
  controllers: Controllers,
  exports: [],
})
export class AuthModule {}
