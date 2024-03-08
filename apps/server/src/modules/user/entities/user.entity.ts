import { BaseEntity } from "@server/core/entities/base.entity"
import { Exclude } from "class-transformer"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IUser } from "../interfaces"

@Entity({ name: "users" })
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  emailVerifiedAt?: Date

  @Column()
  @Exclude()
  password: string
}
