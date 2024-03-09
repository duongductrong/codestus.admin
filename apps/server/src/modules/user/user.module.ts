import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { CreateUserHandler } from "./application/commands/create-user/create-user.handler"
import { CreateUserHttpController } from "./application/commands/create-user/create-user.http.controller"
import { GetUsersCountHandler } from "./application/queries/get-users-count/get-users-count.handler"
import { GetUsersHandler } from "./application/queries/get-users/get-users.handler"
import { GetUsersHttpController } from "./application/queries/get-users/get-users.http.controller"
import { UserEntity } from "./entities/user.entity"
import { UserService } from "./user.service"

const controllers = [GetUsersHttpController, CreateUserHttpController]
const commandHandlers = [CreateUserHandler]
const queryHandlers = [GetUsersHandler, GetUsersCountHandler]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers,
  providers: [UserService, HashService, ...commandHandlers, ...queryHandlers],
  exports: [UserService, HashService],
})
export class UserModule {}
