import { BaseEntity } from "@server/core/entities/base.entity"
import { TagEntity } from "@server/modules/tag/infras/entities/tag.entity"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { PostProps } from "../../domain/post"

// @Unique("posts_slug_unique1", ["slug"])
@Entity({ name: "posts" })
export class PostEntity extends BaseEntity implements PostProps {
  @PrimaryGeneratedColumn("increment", { name: "postId", type: "bigint", unsigned: true })
  id: number

  @Column({ name: "title", type: "varchar", length: 191 })
  title: string

  @Column({ name: "views", type: "mediumint", unsigned: true, default: 0 })
  views: number

  @Column({ name: "thumbnail", type: "text", nullable: true })
  thumbnail?: string

  @Column({ name: "slug", type: "varchar", length: 191, unique: true })
  @Unique("posts_slug_unique", ["slug"])
  slug: string

  @Column({ name: "description", type: "text", nullable: true })
  description?: string

  @Column({ name: "content", type: "text", nullable: true })
  content?: string

  @Column({ name: "status", type: "tinyint", unsigned: true, default: 1 })
  status: number

  @Column({
    name: "publish_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  publishAt: Date

  @Column({ name: "love", type: "mediumint", unsigned: true, default: 0 })
  love: number

  @Column({ name: "unlove", type: "mediumint", unsigned: true, default: 0 })
  unlove: number

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: "userId", foreignKeyConstraintName: "posts_userid_foreign" })
  user: UserEntity

  @ManyToMany(() => TagEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({
    name: "post_to_tag",
    joinColumn: { name: "postId" },
    inverseJoinColumn: {
      name: "tagId",
    },
  })
  tags: TagEntity[]
}
