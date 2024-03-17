/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  ObjectLiteral,
  QueryRunner,
  SaveOptions,
  UpdateResult,
} from "typeorm"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { Transactional } from "typeorm-transactional"
import { Mapper } from "./mapper.interface"

export interface IRepository<Model extends ObjectLiteral, Entity extends ObjectLiteral> {
  find(options?: FindManyOptions<Model>): Promise<Entity[]>
  findOne(options: FindOneOptions<Model>): Promise<Entity | null>
  save(
    entities: DeepPartial<Entity> | DeepPartial<Entity>[],
    options?: SaveOptions & {
      reload?: boolean
    },
  ): Promise<DeepPartial<Model>[] & Model>

  delete(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<Model>,
  ): Promise<DeleteResult>

  softDelete(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<Model>,
  ): Promise<UpdateResult>

  count(options?: FindManyOptions<Model> | undefined): Promise<number>
}

export class Repository<Model extends ObjectLiteral, Entity extends ObjectLiteral>
  implements IRepository<Model, Entity>
{
  constructor(
    readonly target: EntityTarget<Model>,
    readonly manager: EntityManager,
    readonly queryRunner: QueryRunner,
    readonly mapper: Mapper<Model, Entity>,
  ) {}

  private get __repository() {
    return this.manager.getRepository(this.target)
  }

  async find(options?: FindManyOptions<Model>): Promise<Entity[]> {
    const records = await this.__repository.find(options)
    return records.map((record) => this.mapper.toEntity(record))
  }

  async findOne(options: FindOneOptions<Model>): Promise<Entity | null> {
    const model = await this.__repository.findOne(options)
    if (!model) return null
    return this.mapper.toEntity(model)
  }

  async save(
    entities: DeepPartial<Entity> | DeepPartial<Entity>[],
    options?: SaveOptions & { reload?: boolean | undefined },
  ): Promise<DeepPartial<Model>[] & Model> {
    try {
      const r = (await this.manager.transaction(async (entityManager) => {
        return entityManager.save(
          Array.isArray(entities)
            ? entities.map((e) => this.__repository.create(e?.getProps() as unknown as Model))
            : this.__repository.create(entities?.getProps() as any),
          options,
        )
      })) as unknown as Promise<DeepPartial<Model>[] & Model>

      return await r
    } catch (error) {
      throw new Error(error)
    }
  }

  count(options?: FindManyOptions<Model> | undefined): Promise<number> {
    return this.__repository.count(options)
  }

  delete(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<Model>,
  ): Promise<DeleteResult> {
    return this.__repository.delete(criteria)
  }

  softDelete(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<Model>,
  ): Promise<UpdateResult> {
    return this.__repository.softDelete(criteria)
  }
}
