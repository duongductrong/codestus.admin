import { Mapper } from "@server/core/libs/ddd"
import { Tag, TagClass } from "./domain/tag"
import { TagEntity } from "./infras/entities/tag.entity"

export interface ITagMapper extends Mapper<TagEntity, Tag> {}

export class TagMapper implements ITagMapper {
  toEntity(model: TagEntity): Tag {
    return new TagClass(model)
  }
}
