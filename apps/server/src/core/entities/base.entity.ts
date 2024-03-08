import { BaseEntity as BaseEntityPrimitive, CreateDateColumn, UpdateDateColumn } from "typeorm"

export class BaseEntity extends BaseEntityPrimitive {
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date
}
