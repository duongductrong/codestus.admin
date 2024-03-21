import { BadRequestException, Inject } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ICommand } from "@server/core/libs/ddd/cqrs.base"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { PostProps } from "@server/modules/post/domain/post"
import { PostRepositoryPort } from "@server/modules/post/domain/post.repository.port"
import { POST_REPOSITORY } from "@server/modules/post/post.di-tokens"
import { DeleteResult } from "typeorm"

export class DeletePostCommand implements ICommand<Pick<PostProps, "id">> {
  id: number

  constructor(props: DeletePostCommand) {
    Object.assign(this, props)
  }
}

export class DeletePostResult extends DeleteResult {
  constructor(props: DeletePostResult) {
    super()
    Object.assign(this, props)
  }
}

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand, DeletePostResult> {
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  async execute(command: DeletePostCommand): Promise<DeletePostResult> {
    if (Number.isNaN(Number(command.id))) throw new BadRequestException(GENERAL_MESSAGES.NOT_FOUND)

    const result = await this.postRepo.delete({ id: command.id })

    return new DeletePostResult(result)
  }
}
