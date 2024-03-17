import { Repository } from "@server/core/libs/ddd/repository.base"
import { TagEntity } from "../infras/entities/tag.entity"
import { Tag } from "./tag"

export interface TagRepositoryPort extends Repository<TagEntity, Tag> {}
