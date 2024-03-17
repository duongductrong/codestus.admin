import { Inject } from "@nestjs/common"
import { EventPublisher } from "@nestjs/cqrs"
import { Post, PostClass, PostProps } from "./post"

export class PostFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

  create(props: Omit<PostProps, "id">): Post {
    const post = new PostClass(props)
    return this.eventPublisher.mergeObjectContext(post)
  }
}
