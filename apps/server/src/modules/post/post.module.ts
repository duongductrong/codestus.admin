import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TagEntity } from "../tag/infras/entities/tag.entity"
import { TagRepository } from "../tag/infras/repositories/tag.repository"
import { TAG_MAPPER, TAG_REPOSITORY } from "../tag/tag.di-tokens"
import { TagMapper } from "../tag/tag.mapper"
import { UserEntity } from "../user/infras/entities/user.entity"
import { UserRepository } from "../user/infras/repositories/user.repository"
import { USER_MAPPER, USER_REPOSITORY } from "../user/user.di-tokens"
import { UserMapper } from "../user/user.mapper"
import { CreatePostHandler } from "./application/commands/create-post/create-post.handler"
import { CreatePostHttpController } from "./application/commands/create-post/create-post.http.controller"
import { DeletePostHandler } from "./application/commands/delete-post/delete-post.handler"
import { DeletePostHttpController } from "./application/commands/delete-post/delete-post.http.controller"
import { UpdatePostHandler } from "./application/commands/update-post/update-post.handler"
import { UpdatePostHttpController } from "./application/commands/update-post/update-post.http.controller"
import { GetPostHandler } from "./application/queries/get-post/get-post.handler"
import { GetPostHttpController } from "./application/queries/get-post/get-post.http.controller"
import { GetPostsHandler } from "./application/queries/get-posts/get-posts.handler"
import { GetPostsHttpController } from "./application/queries/get-posts/get-posts.http.controller"
import { PostFactory } from "./domain/post.factory"
import { PostEntity } from "./infras/entities/post.entity"
import { PostRepository } from "./infras/repositories/post.repository"
import { POST_FACTORY, POST_MAPPER, POST_REPOSITORY } from "./post.di-tokens"
import { PostMapper } from "./post.mapper"
import { GetPostStatisticsHandler } from "./application/queries/get-post-statistics/get-post-statistics.handler"
import { GetPostStatisticsHttpController } from "./application/queries/get-post-statistics/get-post-statistics.http.controller"

export const Factories: Provider[] = [{ provide: POST_FACTORY, useClass: PostFactory }]
export const Repositories: Provider[] = [
  { provide: POST_REPOSITORY, useClass: PostRepository },
  { provide: TAG_REPOSITORY, useClass: TagRepository },
  { provide: USER_REPOSITORY, useClass: UserRepository },
]
export const Mappers: Provider[] = [
  { provide: POST_MAPPER, useClass: PostMapper },
  { provide: USER_MAPPER, useClass: UserMapper },
  { provide: TAG_MAPPER, useClass: TagMapper },
]
export const Services: Provider[] = []
export const EventHandlers = []
export const CommandHandlers = [CreatePostHandler, UpdatePostHandler, DeletePostHandler]
export const QueryHandlers = [GetPostsHandler, GetPostHandler, GetPostStatisticsHandler]
export const Controllers = [
  GetPostStatisticsHttpController,
  GetPostsHttpController,
  GetPostHttpController,
  CreatePostHttpController,
  UpdatePostHttpController,
  DeletePostHttpController,
]

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, TagEntity])],
  controllers: Controllers,
  providers: [
    ...Services,
    ...Factories,
    ...Repositories,
    ...Mappers,
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class PostModule {}
