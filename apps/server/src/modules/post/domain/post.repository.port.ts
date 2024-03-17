import { Repository } from "@server/core/libs/ddd/repository.base"
import { PostEntity } from "../infras/entities/post.entity"
import { Post } from "./post"

export interface PostRepositoryPort extends Repository<PostEntity, Post> {}
