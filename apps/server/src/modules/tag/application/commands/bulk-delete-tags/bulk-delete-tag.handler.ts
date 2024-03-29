import { Inject } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"
import { DeleteResult } from "typeorm"

export class BulkDeleteTagCommand {
  ids: number[]

  constructor(props: BulkDeleteTagCommand) {
    Object.assign(this, props)
  }
}
export class BulkDeleteTagResult extends DeleteResult {
  constructor(props: BulkDeleteTagResult) {
    super()
    Object.assign(this, props)
  }
}

@CommandHandler(BulkDeleteTagCommand)
export class BulkDeleteTagHandler
  implements ICommandHandler<BulkDeleteTagCommand, BulkDeleteTagResult>
{
  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  async execute(command: BulkDeleteTagCommand): Promise<BulkDeleteTagResult> {
    const result = await this.tagRepo.delete(command.ids)

    return new BulkDeleteTagResult(result)
  }
}
