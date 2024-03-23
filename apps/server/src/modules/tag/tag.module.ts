import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostEntity } from "../post/infras/entities/post.entity"
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

export const Factories: Provider[] = [{ provide: TAG_FACTORY, useClass: TagFactory }]
export const Repositories: Provider[] = [{ provide: TAG_REPOSITORY, useClass: TagRepository }]
export const Mappers: Provider[] = [{ provide: TAG_MAPPER, useClass: TagMapper }]
export const Services: Provider[] = []
export const EventHandlers = []
export const CommandHandlers = [CreateTagHandler, UpdateTagHandler, DeleteTagHandler]
export const QueryHandlers = [GetTagsHandler, GetTagHandler]
export const Controllers = [
  GetTagsHttpController,
  GetTagHttpController,
  CreateTagHttpController,
  UpdateTagHttpController,
  DeleteTagHttpController,
]

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, PostEntity])],
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
