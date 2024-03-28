import { AggregateRootBase, EntityBase } from "@server/core/libs/ddd"
import { PostProps } from "@server/modules/post/domain/post"
import { omit } from "lodash"
import slugify from "slugify"

export interface TagProps {
  id: number
  name: string
  slug: string
  description?: string
  posts?: PostProps[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Tag extends EntityBase<TagProps> {
  setProps(props: Partial<Omit<TagProps, "posts" | "updatedAt" | "createdAt" | "id">>): void

  getProps(): TagProps
}

export class TagClass extends AggregateRootBase implements Tag {
  private readonly id: number

  private name: string

  private slug: string

  private description?: string

  private posts?: PostProps[]

  private createdAt: Date

  private updatedAt: Date

  constructor(props: Omit<TagProps, "id">) {
    super()
    Object.assign(this, props)
  }

  setProps(props: Partial<Omit<TagProps, "posts" | "updatedAt" | "createdAt">>) {
    Object.assign(
      this,
      omit({ ...props, slug: slugify(props.slug ?? this.slug) }, [
        "createdAt",
        "updatedAt",
        "posts",
      ] as (keyof TagProps)[]),
    )
  }

  getProps(): TagProps {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      posts: this.posts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
