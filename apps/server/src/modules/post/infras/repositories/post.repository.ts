import { Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "@server/core/libs/ddd/repository.base"
import { Post } from "../../domain/post"
import { PostRepositoryPort } from "../../domain/post.repository.port"
import { POST_MAPPER } from "../../post.di-tokens"
import { PostMapper } from "../../post.mapper"
import { PostEntity } from "../entities/post.entity"

export class PostRepository extends Repository<PostEntity, Post> implements PostRepositoryPort {
  constructor(
    @InjectRepository(PostEntity) readonly repository: Repository<PostEntity, Post>,
    @Inject(POST_MAPPER) readonly mapper: PostMapper,
  ) {
    super(repository.target, repository.manager, repository.queryRunner, mapper)
  }
}
