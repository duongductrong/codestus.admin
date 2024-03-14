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
import { UserRepository } from "./infras/repositories/user.repository"
import { USER_FACTORY, USER_REPOSITORY } from "./user.di-tokens"

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: HttpControllers,
  providers: [
    HashService,
    { provide: USER_FACTORY, useClass: UserFactory },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class UserModule {}
