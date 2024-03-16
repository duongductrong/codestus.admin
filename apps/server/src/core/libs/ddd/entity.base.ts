import { AggregateRoot } from "@nestjs/cqrs"

export abstract class EntityBase<EntityProps> extends AggregateRoot {
  getProps(): EntityProps {
    return this.getProps()
  }
}
