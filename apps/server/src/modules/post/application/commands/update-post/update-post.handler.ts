import { BadRequestException, Inject, NotFoundException } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ICommand } from "@server/core/libs/ddd"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { PostProps } from "@server/modules/post/domain/post"
import { PostRepositoryPort } from "@server/modules/post/domain/post.repository.port"
import { POST_REPOSITORY } from "@server/modules/post/post.di-tokens"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"
import { UserProps } from "@server/modules/user/domain/user"
import { In, Not } from "typeorm"

export class UpdatePostCommand
  implements
    ICommand<
      Omit<
        PostProps,
        "createdAt" | "updatedAt" | "views" | "love" | "unlove" | "user" | "tags" | "publishAt"
      >
    >
{
  id: number

  title: string

  thumbnail?: string

  slug: string

  description?: string

  content?: string

  status: number

  tagIds: number[]

  shouldStrictValidate?: boolean

  constructor(props: UpdatePostCommand) {
    Object.assign(this, props)
  }
}

export class UpdatePostResult implements PostProps {
  id: number

  title: string

  views: number

  thumbnail?: string | undefined

  slug: string

  description?: string | undefined

  content?: string | undefined

  status: number

  createdAt: Date

  updatedAt: Date

  publishAt: Date

  love: number

  unlove: number

  user: UserProps

  tags: TagProps[]

  constructor(props: PostProps) {
    Object.assign(this, props)
  }
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand, UpdatePostResult> {
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  private async validate(command: UpdatePostCommand) {
    const post = await this.postRepo.findOne({
      where: { slug: command.slug, id: Not(Number(command.id)) },
    })

    // Is slug duplicated?
    if (post) throw new BadRequestException(GENERAL_MESSAGES.POST_SLUG_DUPLICATED)
  }

  async execute({
    id,
    slug,
    shouldStrictValidate = true,
    ...command
  }: UpdatePostCommand): Promise<UpdatePostResult> {
    const [post, tags] = await Promise.all([
      this.postRepo.findOne({ where: { id } }),
      this.tagRepo.find({ where: { id: In(command?.tagIds) } }),
    ])

    if (!post) throw new NotFoundException(GENERAL_MESSAGES.NOT_FOUND)

    if (shouldStrictValidate) this.validate({ id, slug, ...command })

    post.setProps({
      ...command,
      tags: tags.map((tag) => tag.getProps()),
    })

    const updated = await this.postRepo.save(post)

    return new UpdatePostResult(updated)
  }
}
