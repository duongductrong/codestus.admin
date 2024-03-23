import { Inject } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ICommand } from "@server/core/libs/ddd/cqrs.base"
import { PostProps } from "@server/modules/post/domain/post"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagFactory } from "@server/modules/tag/domain/tag.factory"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_FACTORY, TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"

export class CreateTagCommand
  implements ICommand<Omit<TagProps, "id" | "posts" | "createdAt" | "updatedAt">>
{
  name: string

  slug: string

  description?: string

  constructor(props: CreateTagCommand) {
    Object.assign(this, props)
  }
}

export class CreateTagResult implements TagProps {
  id: number

  name: string

  slug: string

  description?: string

  posts?: PostProps[]

  createdAt?: Date

  updatedAt?: Date

  constructor(props: CreateTagResult) {
    Object.assign(this, props)
  }
}

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand, CreateTagResult> {
  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  @Inject(TAG_FACTORY) private readonly tagFactory: TagFactory

  async execute(command: CreateTagCommand): Promise<CreateTagResult> {
    const tag = this.tagFactory.create(command)

    await this.tagRepo.save(tag)

    return new CreateTagResult(tag.getProps())
  }
}
