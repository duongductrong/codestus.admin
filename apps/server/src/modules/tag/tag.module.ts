import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostEntity } from "../post/infras/entities/post.entity"
import { UserRepository } from "../user/infras/repositories/user.repository"
import { USER_MAPPER, USER_REPOSITORY } from "../user/user.di-tokens"
import { UserMapper } from "../user/user.mapper"
import { BulkDeleteTagHandler } from "./application/commands/bulk-delete-tags/bulk-delete-tag.handler"
import { BulkDeleteTagHttpController } from "./application/commands/bulk-delete-tags/bulk-delete-tag.http.controller"
import { CreateTagHandler } from "./application/commands/create-tag/create-tag.handler"
import { CreateTagHttpController } from "./application/commands/create-tag/create-tag.http.controller"
import { DeleteTagHandler } from "./application/commands/delete-tag/delete-tag.handler"
import { DeleteTagHttpController } from "./application/commands/delete-tag/delete-tag.http.controller"
import { UpdateTagHandler } from "./application/commands/update-tag/update-tag.handler"
import { UpdateTagHttpController } from "./application/commands/update-tag/update-tag.http.controller"
import { GetTagHandler } from "./application/queries/get-tag/get-tag.handler"
import { GetTagHttpController } from "./application/queries/get-tag/get-tag.http.controller"
import { GetTagsHandler } from "./application/queries/get-tags/get-tags.handler"
import { GetTagsHttpController } from "./application/queries/get-tags/get-tags.http.controller"
import { TagFactory } from "./domain/tag.factory"
import { TagEntity } from "./infras/entities/tag.entity"
import { TagRepository } from "./infras/repositories/tag.repository"
import { TAG_FACTORY, TAG_MAPPER, TAG_REPOSITORY } from "./tag.di-tokens"
import { TagMapper } from "./tag.mapper"
import { UserEntity } from "../user/infras/entities/user.entity"

export const Factories: Provider[] = [{ provide: TAG_FACTORY, useClass: TagFactory }]
export const Repositories: Provider[] = [{ provide: TAG_REPOSITORY, useClass: TagRepository }]
export const Mappers: Provider[] = [{ provide: TAG_MAPPER, useClass: TagMapper }]
export const Services: Provider[] = []
export const EventHandlers = []
export const CommandHandlers = [
  CreateTagHandler,
  UpdateTagHandler,
  DeleteTagHandler,
  BulkDeleteTagHandler,
]
export const QueryHandlers = [GetTagsHandler, GetTagHandler]
export const Controllers = [
  GetTagsHttpController,
  GetTagHttpController,
  CreateTagHttpController,
  UpdateTagHttpController,
  DeleteTagHttpController,
  BulkDeleteTagHttpController,
]

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, UserEntity, PostEntity])],
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
export class TagModule {}
