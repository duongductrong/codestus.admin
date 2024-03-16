export interface Mapper<Model, Entity> {
  // toModel(record: Entity): Model
  toEntity(model: Model): Entity
}
