import { Module, Provider } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { CreateUserHandler } from "./application/commands/create-user/create-user.handler"
import { CreateUserHttpController } from "./application/commands/create-user/create-user.http.controller"
import { UpdateUserHandler } from "./application/commands/update-user/update-user.handler"
import { UpdateUserHttpController } from "./application/commands/update-user/update-user.http.controller"
import { UserCreatedHandler } from "./application/events/user-created.handler"
import { GetUserHandler } from "./application/queries/get-user/get-user.handler"
import { GetUsersCountHandler } from "./application/queries/get-users-count/get-users-count.handler"
import { GetUsersHandler } from "./application/queries/get-users/get-users.handler"
import { GetUsersHttpController } from "./application/queries/get-users/get-users.http.controller"
import { UserFactory } from "./domain/user.factory"
import { UserEntity } from "./infras/entities/user.entity"
import { UserRepository } from "./infras/repositories/user.repository"
import { USER_FACTORY, USER_MAPPER, USER_REPOSITORY } from "./user.di-tokens"
import { UserMapper } from "./user.mapper"

export const Factories: Provider[] = [{ provide: USER_FACTORY, useClass: UserFactory }]
export const Repositories: Provider[] = [{ provide: USER_REPOSITORY, useClass: UserRepository }]
export const Mappers: Provider[] = [{ provide: USER_MAPPER, useClass: UserMapper }]
export const Services: Provider[] = [HashService]
export const EventHandlers = [UserCreatedHandler]
export const CommandHandlers = [CreateUserHandler, UpdateUserHandler]
export const QueryHandlers = [GetUsersHandler, GetUsersCountHandler, GetUserHandler]
export const Controllers = [
  GetUsersHttpController,
  CreateUserHttpController,
  UpdateUserHttpController,
]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: Controllers,
  providers: [
    ...Services,
    ...Factories,
    ...Repositories,
    ...Mappers,
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class UserModule {}
