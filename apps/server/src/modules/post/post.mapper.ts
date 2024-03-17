import { Mapper } from "@server/core/libs/ddd"
import { PostEntity } from "./infras/entities/post.entity"
import { Post, PostClass } from "./domain/post"

export interface IPostMapper extends Mapper<PostEntity, Post> {}

export class PostMapper implements IPostMapper {
  toEntity(model: PostEntity): Post {
    return new PostClass(model)
  }
}
