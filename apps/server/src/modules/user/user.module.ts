import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { CreateUserHandler } from "./application/commands/create-user.handler"
import { UserEntity } from "./entities/user.entity"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

const CommandHandlers = [CreateUserHandler]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, HashService, ...CommandHandlers],
  exports: [UserService, HashService],
})
export class UserModule {}
