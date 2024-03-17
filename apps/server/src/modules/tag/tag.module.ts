import { Module, Provider } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostEntity } from "../post/infras/entities/post.entity"
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
export const CommandHandlers = []
export const QueryHandlers = []
export const Controllers = []

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
