import { Inject } from "@nestjs/common"
import { EventPublisher } from "@nestjs/cqrs"
import { HashService, IHashService } from "@server/core/services/hash/hash.service"
import { User, UserClass, UserProps } from "./user"

export interface IUserFactory {
  create(props: Omit<UserProps, "id">): User
}

export class UserFactory implements IUserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

  @Inject(HashService) private readonly hashService: IHashService

  create(props: Omit<UserProps, "id">): User {
    const user = new UserClass({
      ...props,
      password: this.hashService.makeAsync(props.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    user.created()

    return this.eventPublisher.mergeObjectContext(user)
  }
}
