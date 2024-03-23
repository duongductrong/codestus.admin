import { Inject } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ICommand } from "@server/core/libs/ddd/cqrs.base"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"
import { DeleteResult } from "typeorm"

export class DeleteTagCommand implements ICommand<Pick<TagProps, "id">> {
  id: number

  constructor(props: DeleteTagCommand) {
    Object.assign(this, props)
  }
}

export class DeleteTagResult extends DeleteResult {
  constructor(props: DeleteTagResult) {
    super()
    Object.assign(this, props)
  }
}

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand, DeleteTagResult> {
  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  async execute(command: DeleteTagCommand): Promise<DeleteTagResult> {
    const deleted = await this.tagRepo.delete({ id: command.id })

    return new DeleteTagResult(deleted)
  }
}
