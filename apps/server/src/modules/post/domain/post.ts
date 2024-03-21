import { AggregateRoot } from "@nestjs/cqrs"
import { TagProps } from "@server/modules/tag/domain/tag"
import { UserProps } from "@server/modules/user/domain/user"
import { omit } from "lodash"
import slugify from "slugify"

export interface PostProps {
  id: number
  title: string
  views: number
  thumbnail?: string
  slug: string
  description?: string
  content?: string
  status: number
  createdAt: Date
  updatedAt: Date
  publishAt: Date
  love: number
  unlove: number
  user: UserProps
  tags: TagProps[]
}

export interface Post extends Pick<AggregateRoot, "commit" | "autoCommit" | "uncommit"> {
  getProps(): PostProps
  setProps(props: Partial<PostProps>): void
}

export class PostClass extends AggregateRoot implements Post {
  private readonly id: number

  private title: string

  private views: number

  private thumbnail?: string

  private slug: string

  private description?: string

  private content?: string

  private status: number

  private createdAt: Date

  private updatedAt: Date

  private publishAt: Date

  private love: number

  private unlove: number

  private user: UserProps

  private tags: TagProps[]

  constructor(props: Omit<PostProps, "id">) {
    super()
    Object.assign(this, props)
  }

  setProps(
    props: Omit<
      Partial<PostProps>,
      "user" | "unlove" | "love" | "views" | "updatedAt" | "createdAt"
    >,
  ) {
    const cleanProps = omit<Partial<PostProps>>(props, [
      "user",
      "unlove",
      "love",
      "views",
      "updatedAt",
      "createdAt",
    ] as (keyof PostProps)[])
    const _slug = cleanProps?.slug ? slugify(cleanProps.slug) : this.slug

    Object.assign(this, {
      ...cleanProps,
      slug: _slug,
    })
  }

  getProps(): PostProps {
    return {
      content: this.content,
      createdAt: this.createdAt,
      description: this.description,
      id: this.id,
      love: this.love,
      publishAt: this.publishAt,
      slug: this.slug,
      status: this.status,
      thumbnail: this.thumbnail,
      title: this.title,
      unlove: this.unlove,
      updatedAt: this.updatedAt,
      views: this.views,
      user: this.user,
      tags: this.tags,
    }
  }
}
