// import { Entity } from "./entity.base"

export interface Mapper<DomainEntity, Entity> {
  // toPersistence(entity: DomainEntity): DbRecord
  // toResponse(entity: DomainEntity): Response
  toDomain(record: any): DomainEntity
  toEntity(model: DomainEntity): Entity
}

// export interface Mapper<DomainEntity extends Entity<any>, DbRecord, Response = any> {
//   toPersistence(entity: DomainEntity): DbRecord
//   toDomain(record: any): DomainEntity
//   toResponse(entity: DomainEntity): Response
// }
