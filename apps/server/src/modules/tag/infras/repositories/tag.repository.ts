import { Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Mapper } from "@server/core/libs/ddd"
import { Repository } from "@server/core/libs/ddd/repository.base"
import { Tag } from "../../domain/tag"
import { TagRepositoryPort } from "../../domain/tag.repository.port"
import { TAG_MAPPER } from "../../tag.di-tokens"
import { TagEntity } from "../entities/tag.entity"

export class TagRepository extends Repository<TagEntity, Tag> implements TagRepositoryPort {
  constructor(
    @InjectRepository(TagEntity) readonly repository: Repository<TagEntity, Tag>,
    @Inject(TAG_MAPPER) readonly mapper: Mapper<TagEntity, Tag>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner, mapper)
  }
}
