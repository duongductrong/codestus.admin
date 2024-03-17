import { Mapper } from "@server/core/libs/ddd"
import { TagEntity } from "./infras/entities/tag.entity"
import { Tag, TagClass } from "./domain/tag"

export class TagMapper implements Mapper<TagEntity, Tag> {
  toEntity(model: TagEntity): Tag {
    return new TagClass(model)
  }
}
