import { BadRequestException, Inject, NotFoundException } from "@nestjs/common"
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { JwtService } from "@nestjs/jwt"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { HashService } from "@server/core/services/hash/hash.service"
import { UserRepositoryPort } from "@server/modules/user/infras/repositories/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import * as dayjs from "dayjs"

export class LoginCommand implements ICommand {
  identifier: string

  password: string

  constructor(props: LoginCommand) {
    this.identifier = props.identifier
    this.password = props.password
  }
}

export class LoginResult {
  jwtToken: string

  expiredAt: string | Date
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, LoginResult> {
  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  @Inject() private readonly hash: HashService

  @Inject(JwtService) private readonly jwtService: JwtService

  async execute(credentials: LoginCommand): Promise<LoginResult> {
    const user = await this.userRepo.findOne({
      where: { email: credentials.identifier },
    })

    if (!user) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    const isMatchedPwd = await this.hash.check(credentials.password, user?.password)

    if (!isMatchedPwd) throw new BadRequestException(GENERAL_MESSAGES.PASSWORD_MISMATCH)

    const payload = { id: user.id, email: user.email, name: user.name }
    const token = await this.jwtService.sign(payload)

    return {
      jwtToken: token,
      expiredAt: dayjs().add(3, "hour").toISOString(),
    }
  }
}
