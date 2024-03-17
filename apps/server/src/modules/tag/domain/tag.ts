import { AggregateRootBase, EntityBase } from "@server/core/libs/ddd"

export interface TagProps {
  id: number
  name: string
  slug: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Tag extends EntityBase<TagProps> {}

export class TagClass extends AggregateRootBase implements Tag {
  private readonly id: number

  private name: string

  private slug: string

  private description?: string

  constructor(props: Omit<TagProps, "id">) {
    super()
    Object.assign(this, props)
  }

  getProps(): TagProps {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
    }
  }
}
