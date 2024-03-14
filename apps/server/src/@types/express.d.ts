import { UserProps } from "@server/modules/user/domain/user"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"

declare global {
  namespace Express {
    export interface Request {
      user: UserProps
    }
  }
}
