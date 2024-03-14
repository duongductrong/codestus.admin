import { Module, Provider } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HashService } from "@server/core/services/hash/hash.service"
import { UserFactory } from "../user/domain/user.factory"
import { UserEntity } from "../user/infras/entities/user.entity"
import { UserRepository } from "../user/infras/repositories/user.repository"
import { CommandHandlers } from "./application/commands"
import { LoginHttpController } from "./application/commands/login/login.http.controller"
import { SignUpHttpController } from "./application/commands/signup/signup.http.controller"
import {
  USER_FACTORY,
  USER_HASH_SERVICE,
  USER_JWT_SERVICE,
  USER_REPOSITORY,
} from "./auth.di-tokens"

const Controllers = [LoginHttpController, SignUpHttpController]
const Repositories: Provider[] = [{ provide: USER_REPOSITORY, useClass: UserRepository }]
const Services: Provider[] = [
  { provide: USER_HASH_SERVICE, useClass: HashService },
  { provide: USER_JWT_SERVICE, useClass: JwtService },
  { provide: USER_FACTORY, useClass: UserFactory },
]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: "MY_SECRET_KEY",
      signOptions: { expiresIn: "3h" },
    }),
  ],
  providers: [...Services, ...Repositories, ...CommandHandlers],
  controllers: Controllers,
  exports: [],
})
export class AuthModule {}
