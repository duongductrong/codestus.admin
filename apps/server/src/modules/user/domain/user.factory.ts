import { Inject } from "@nestjs/common"
import { EventPublisher } from "@nestjs/cqrs"
import { User, UserClass, UserProps } from "./user"

export interface IUserFactory {
  create(props: Omit<UserProps, "id">): User
}

export class UserFactory implements IUserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

  create(props: Omit<UserProps, "id">): User {
    const user = new UserClass({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    user.created()

    return this.eventPublisher.mergeObjectContext(user)
  }
}
