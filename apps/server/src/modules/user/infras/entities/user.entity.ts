import { BaseEntity } from "@server/core/entities/base.entity"
import { Exclude } from "class-transformer"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { UserProps } from "../../domain/user"

@Entity({ name: "users" })
export class UserEntity extends BaseEntity implements UserProps {
  @PrimaryGeneratedColumn("increment", { name: "userId", type: "bigint", unsigned: true })
  id: number

  @Column({ name: "name", nullable: true })
  name?: string

  @Column({ name: "email" })
  email: string

  @Column({ name: "email_verified_at", nullable: true })
  emailVerifiedAt?: Date

  @Column({ name: "remember_token", nullable: true })
  rememberToken?: string

  @Column({ name: "provider", nullable: true })
  provider?: string

  @Column({ name: "provider_id", nullable: true })
  providerId?: string

  @Column({ name: "avatar", nullable: true })
  avatar?: string

  @Column({ name: "password" })
  @Exclude()
  password: string
}
