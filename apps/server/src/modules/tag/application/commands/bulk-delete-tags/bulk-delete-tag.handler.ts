import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"

export class BulkDeleteTagCommand {
  ids: number[]

  constructor(props: BulkDeleteTagCommand) {
    Object.assign(this, props)
  }
}

export class BulkDeleteTagResult {}

@CommandHandler(BulkDeleteTagCommand)
export class BulkDeleteTagHandler
  implements ICommandHandler<BulkDeleteTagCommand, BulkDeleteTagResult>
{
  execute(command: BulkDeleteTagCommand): Promise<BulkDeleteTagResult> {
    throw new Error("Method not implemented.")
  }
}
