import { Inject } from "@nestjs/common"
import { EventPublisher } from "@nestjs/cqrs"
import { Post, PostClass, PostProps } from "./post"

export class PostFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher

  create(
    props: Omit<
      PostProps,
      "id" | "publishAt" | "updatedAt" | "createdAt" | "love" | "unlove" | "views"
    >,
  ): Post {
    const initialStates = {} as Partial<PostProps>
    const post = new PostClass({
      love: 0,
      unlove: 0,
      views: 0,
      publishAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...initialStates,
      ...props,
    })
    return this.eventPublisher.mergeObjectContext(post)
  }
}
