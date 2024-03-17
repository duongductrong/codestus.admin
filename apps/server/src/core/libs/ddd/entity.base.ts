import { AggregateRoot } from "@nestjs/cqrs"

export interface EntityBase<EntityProps>
  extends Pick<AggregateRoot, "commit" | "autoCommit" | "uncommit"> {
  getProps(): EntityProps
}

export abstract class AggregateRootBase extends AggregateRoot {}
