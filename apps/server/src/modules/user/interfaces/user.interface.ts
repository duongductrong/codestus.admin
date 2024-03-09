import { IBaseEntity } from "@server/core/entities/base.interface"

export interface IUser extends IBaseEntity {
  id: number
  name?: string
  email: string
  password: string
  rememberToken?: string
  provider?: string
  providerId?: string
  avatar?: string
  emailVerifiedAt?: Date
  // posts             Post[]
}
