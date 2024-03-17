import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TagEntity } from "../tag/infras/entities/tag.entity"
import { UserEntity } from "../user/infras/entities/user.entity"
import { GetPostsHandler } from "./application/queries/get-posts.handler"
import { GetPostsHttpController } from "./application/queries/get-posts.http.controller"
import { PostFactory } from "./domain/post.factory"
import { PostEntity } from "./infras/entities/post.entity"
import { PostRepository } from "./infras/repositories/post.repository"
import { POST_FACTORY, POST_MAPPER, POST_REPOSITORY } from "./post.di-tokens"
import { PostMapper } from "./post.mapper"

export const Factories: Provider[] = [{ provide: POST_FACTORY, useClass: PostFactory }]
export const Repositories: Provider[] = [{ provide: POST_REPOSITORY, useClass: PostRepository }]
export const Mappers: Provider[] = [{ provide: POST_MAPPER, useClass: PostMapper }]
export const Services: Provider[] = []
export const EventHandlers = []
export const CommandHandlers = []
export const QueryHandlers = [GetPostsHandler]
export const Controllers = [GetPostsHttpController]

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
