import { ForbiddenException, Inject, NotFoundException } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { JwtService } from "@nestjs/jwt"
import { ICommand } from "@server/core/libs/ddd/cqrs.base"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"

export class RefreshTokenCommand implements ICommand {
  token: string

  constructor(props: RefreshTokenCommand) {
    Object.assign(this, props)
  }
}

export class RefreshTokenResult {
  token: string

  expiredAt: string | Date

  constructor(props: RefreshTokenResult) {
    Object.assign(this, props)
  }
}

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand, RefreshTokenResult>
{
  @Inject() private readonly jwtService: JwtService

  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  async execute(command: RefreshTokenCommand): Promise<RefreshTokenResult> {
    const decoded = await this.jwtService.decode(command.token)

    if (!decoded) throw new ForbiddenException(GENERAL_MESSAGES.INVALID_CREDENTIALS)

    const user = await this.userRepo.findOne({
      where: { id: decoded.id },
    })

    if (!user) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    const userProps = user?.getProps()

    // generate new token
    const payload = { id: userProps.id, email: userProps.email, name: userProps.name }
    const token = await this.jwtService.sign(payload)

    return new RefreshTokenResult({ expiredAt: new Date(), token })
  }
}
