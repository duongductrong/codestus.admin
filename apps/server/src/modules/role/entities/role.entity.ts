import { BaseEntity } from "@server/core/entities/base.entity"
import { UserEntity } from "@server/modules/user/infras/entities/user.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "roles" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ name: "name" })
  name: string

  @Column({ name: "description", nullable: true })
  description: string

  @Column({ name: "privileges", type: "json" })
  privileges: object

  @Column({ name: "active", default: true })
  active: boolean

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn()
  createdBy?: UserEntity
}
