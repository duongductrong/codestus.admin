/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  QueryRunner,
  SaveOptions,
} from "typeorm"
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
      this.queryRunner.startTransaction()
      const processor = this.__repository.save(
        Array.isArray(entities)
          ? entities.map((e) => this.__repository.create(e?.getProps() as unknown as Model))
          : this.__repository.create(entities?.getProps() as any),
        options,
      ) as Promise<DeepPartial<Model>[] & Model>

      const result = await processor

      this.queryRunner.commitTransaction()

      return result
    } catch (error) {
      this.queryRunner.rollbackTransaction()
      throw new Error(error)
    }
  }

  count(options?: FindManyOptions<Model> | undefined): Promise<number> {
    return this.__repository.count(options)
  }
}
