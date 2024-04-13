import { EventEmitter2 } from "@nestjs/event-emitter"
import { AggregateRoot as AggregateRootPrimitive } from "@nestjs/cqrs"
import { DomainEvent } from "./domain-event.base"

export abstract class AggregateRoot<EntityProps> extends AggregateRootPrimitive {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
  }

  public clearEvents(): void {
    this._domainEvents = []
  }

  public async publishEvents(eventEmitter: EventEmitter2): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        // logger.debug(
        //   `[${RequestContextService.getRequestId()}] "${
        //     event.constructor.name
        //   }" event published for aggregate ${this.constructor.name} : ${this.id}`,
        // )
        return eventEmitter.emitAsync(event.constructor.name, event)
      }),
    )
    this.clearEvents()
  }
}
