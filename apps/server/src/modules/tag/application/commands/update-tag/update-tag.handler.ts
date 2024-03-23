import { Inject, NotFoundException } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ICommand } from "@server/core/libs/ddd/cqrs.base"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { PostProps } from "@server/modules/post/domain/post"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"

export class UpdateTagCommand implements ICommand<Omit<TagProps, "createdAt" | "updatedAt">> {
  id: number

  name: string

  slug: string

  description?: string

  constructor(props: UpdateTagCommand) {
    Object.assign(this, props)
  }
}

export class UpdateTagResult implements TagProps {
  id: number

  name: string

  slug: string

  description?: string

  posts?: PostProps[]

  createdAt?: Date

  updatedAt?: Date

  constructor(props: UpdateTagResult) {
    Object.assign(this, props)
  }
}

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand, UpdateTagResult> {
  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  async execute(command: UpdateTagCommand): Promise<UpdateTagResult> {
    const tag = await this.tagRepo.findOne({ where: { id: command.id } })

    if (!tag) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    tag.setProps({
      description: command.description,
      name: command.name,
      slug: command.slug,
    })

    await this.tagRepo.save(tag)

    return new UpdateTagResult(tag.getProps())
  }
}
