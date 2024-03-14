import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { HttpControllers } from "./application"
import { CommandHandlers } from "./application/commands"
import { EventHandlers } from "./application/events"
import { QueryHandlers } from "./application/queries"
import { UserFactory } from "./domain/user.factory"
import { UserEntity } from "./infras/entities/user.entity"
import { UserService } from "./user.service"
import { UserRepository } from "./infras/repositories/user.repository"

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: HttpControllers,
  providers: [
    UserService,
    HashService,
    UserFactory,
    UserRepository,

    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [UserService, HashService],
})
export class UserModule {}
