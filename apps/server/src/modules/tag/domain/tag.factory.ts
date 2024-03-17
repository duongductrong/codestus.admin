import { Inject } from "@nestjs/common"
import { EventPublisher } from "@nestjs/cqrs"
import { Tag, TagClass, TagProps } from "./tag"

export class TagFactory {
  @Inject(EventPublisher) eventPublisher: EventPublisher

  create(props: TagProps): Tag {
    const tag = new TagClass({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return this.eventPublisher.mergeObjectContext(tag)
  }
}
