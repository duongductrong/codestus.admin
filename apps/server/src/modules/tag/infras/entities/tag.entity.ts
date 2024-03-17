import { BaseEntity } from "@server/core/entities/base.entity"
import { PostEntity } from "@server/modules/post/infras/entities/post.entity"
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import { TagProps } from "../../domain/tag"

@Unique("tags_slug_unique", ["slug"])
@Entity({ name: "tags" })
export class TagEntity extends BaseEntity implements TagProps {
  @PrimaryGeneratedColumn({ name: "tagId", type: "bigint", unsigned: true })
  id: number

  @Column({ name: "name", type: "varchar", length: 191 })
  name: string

  @Column({ name: "slug", type: "varchar", length: 191 })
  slug: string

  @Column({ name: "description", type: "text", nullable: true })
  description?: string

  @ManyToMany(() => PostEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({
    name: "post_to_tag",
    joinColumn: { name: "tagId" },
    inverseJoinColumn: {
      name: "postId",
    },
  })
  posts: PostEntity[]
}
