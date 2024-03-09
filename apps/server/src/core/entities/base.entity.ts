import { BaseEntity as BaseEntityPrimitive, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IBaseEntity } from "./base.interface"

export class BaseEntity extends BaseEntityPrimitive implements IBaseEntity {
  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date
}
