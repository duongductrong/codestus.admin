import { BadRequestException, Inject } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ICommand } from "@server/core/libs/ddd"
import { GENERAL_MESSAGES } from "@server/core/message.base"
import { PostProps } from "@server/modules/post/domain/post"
import { PostFactory } from "@server/modules/post/domain/post.factory"
import { PostRepositoryPort } from "@server/modules/post/domain/post.repository.port"
import { POST_FACTORY, POST_REPOSITORY } from "@server/modules/post/post.di-tokens"
import { TagProps } from "@server/modules/tag/domain/tag"
import { TagRepositoryPort } from "@server/modules/tag/domain/tag.repository.port"
import { TAG_REPOSITORY } from "@server/modules/tag/tag.di-tokens"
import { UserProps } from "@server/modules/user/domain/user"
import { UserRepositoryPort } from "@server/modules/user/domain/user.repository.port"
import { USER_REPOSITORY } from "@server/modules/user/user.di-tokens"
import { In } from "typeorm"

export class CreatePostCommand
  implements
    ICommand<
      Omit<
        PostProps,
        | "createdAt"
        | "updatedAt"
        | "id"
        | "views"
        | "love"
        | "unlove"
        | "user"
        | "tags"
        | "publishAt"
      >
    >
{
  title: string

  thumbnail?: string

  slug: string

  description?: string

  content?: string

  status: number

  userId: number

  tagIds: number[]

  constructor(props: CreatePostCommand) {
    Object.assign(this, props)
  }
}

export class CreatePostResult implements PostProps {
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

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand, CreatePostResult> {
  @Inject(POST_REPOSITORY) private readonly postRepo: PostRepositoryPort

  @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepositoryPort

  @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort

  @Inject(POST_FACTORY) private readonly postFactory: PostFactory

  async execute(command: CreatePostCommand): Promise<CreatePostResult> {
    const [user, tags] = await Promise.all([
      this.userRepo.findOne({ where: { id: command.userId } }),
      this.tagRepo.find({ where: { id: In(command.tagIds) } }),
    ])

    if (!user) throw new BadRequestException(GENERAL_MESSAGES.USER_NOT_FOUND)

    const postInstance = this.postFactory.create({
      slug: command.slug,
      status: command.status,
      title: command.title,
      content: command.content,
      description: command.description,
      thumbnail: command.thumbnail,
      tags: tags.map((tag) => tag.getProps()),
      user: user.getProps(),
    })

    const postCreated = await this.postRepo.save(postInstance)

    return new CreatePostResult(postCreated)
  }
}
