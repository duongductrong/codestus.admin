import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Request } from "express"
import { Repository } from "typeorm"
import { UserEntity } from "../../../user/infras/entities/user.entity"

@Injectable()
export class AuthGuard implements CanActivate {
  @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>

  @Inject(JwtService) private readonly jwtService: JwtService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeaders(request)

    try {
      const verified = this.jwtService.verify(token)
      const user = await this.userRepo.findOne({
        where: { id: verified.id, email: verified.email },
      })

      if (!user) throw new UnauthorizedException()

      request.user = user

      return true
    } catch (error) {
      throw new UnauthorizedException(error.message, { cause: { token } })
    }
  }

  private extractTokenFromHeaders(request: Request) {
    const auth = request.headers.authorization

    if (!auth) throw new UnauthorizedException()

    const [__, token] = auth.split?.(" ") ?? null

    return token
  }
}
