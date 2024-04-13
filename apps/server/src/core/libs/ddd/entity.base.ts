import { AggregateRoot as AggregateRootBase } from "@nestjs/cqrs"

export interface EntityBase<EntityProps>
  extends Pick<AggregateRootBase, "commit" | "autoCommit" | "uncommit"> {
  getProps(): EntityProps
}

export abstract class AggregateRoot extends AggregateRootBase {}
