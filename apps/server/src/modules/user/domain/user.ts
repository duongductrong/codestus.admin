import { AggregateRoot } from "@nestjs/cqrs"
import { UserCreatedEvent } from "./events/user-created.event"

export interface UserProps {
  id: number
  password: string
  email: string
  name?: string
  emailVerifiedAt?: Date
  rememberToken?: string
  provider?: string
  providerId?: string
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface User extends Pick<AggregateRoot, "commit" | "autoCommit" | "uncommit"> {
  setName(name: string): void
  verifiedEmail(): void
  updatePassword(password: string): void
  getProps(): UserProps
  created(): void
}

export class UserClass extends AggregateRoot implements User {
  private readonly id: number

  private readonly email: string

  private password: string

  private name: string

  private emailVerifiedAt?: Date

  private rememberToken?: string

  private provider?: string

  private providerId?: string

  private avatar?: string

  private updatedAt?: Date

  private createdAt?: Date

  constructor(props: Omit<UserProps, "id">) {
    super()
    Object.assign(this, props)
  }

  static create(create: UserProps) {
    const user = new UserClass(create)

    user.apply(new UserCreatedEvent())

    return user
  }

  created() {
    this.apply(new UserCreatedEvent())
  }

  setName(name: string): void {
    this.name = name
    this.updatedAt = new Date()
  }

  verifiedEmail(): void {
    this.emailVerifiedAt = new Date()
    this.updatedAt = new Date()
  }

  updatePassword(password: string): void {
    this.password = password
    this.updatedAt = new Date()
  }

  getProps(): UserProps {
    return {
      email: this.email,
      id: this.id,
      password: this.password,
      avatar: this.avatar,
      createdAt: this.createdAt,
      emailVerifiedAt: this.emailVerifiedAt,
      name: this.name,
      provider: this.provider,
      providerId: this.providerId,
    }
  }
}
