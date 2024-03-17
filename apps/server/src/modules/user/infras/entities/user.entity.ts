import { BaseEntity } from "@server/core/entities/base.entity"
import { Exclude } from "class-transformer"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PostEntity } from "@server/modules/post/infras/entities/post.entity"
import { UserProps } from "../../domain/user"

@Entity({ name: "users" })
export class UserEntity extends BaseEntity implements UserProps {
  @PrimaryGeneratedColumn("increment", { name: "userId", type: "bigint", unsigned: true })
  id: number

  @Column({ name: "name", type: "varchar", length: 191, nullable: true })
  name?: string

  @Column({ name: "email", type: "varchar", length: 191, unique: true })
  email: string

  @Column({ name: "email_verified_at", type: "timestamp", nullable: true })
  emailVerifiedAt?: Date

  @Column({ name: "remember_token", type: "varchar", length: 100, nullable: true })
  rememberToken?: string

  @Column({ name: "provider", type: "varchar", length: 191, nullable: true })
  provider?: string

  @Column({ name: "provider_id", type: "varchar", length: 191, nullable: true })
  providerId?: string

  @Column({ name: "avatar", nullable: true })
  avatar?: string

  @Column({ name: "password", type: "varchar", length: 191 })
  @Exclude()
  password: string

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[]
}
