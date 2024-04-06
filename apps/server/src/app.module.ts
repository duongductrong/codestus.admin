import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { CqrsModule } from "@nestjs/cqrs"
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n"
import { join } from "path"
import { DataSource } from "typeorm"
import { addTransactionalDataSource } from "typeorm-transactional"
import { AppConfig, app as appConfig } from "./configs/app.config"
import { database as databaseConfig } from "./configs/database.config"
import { resource as resourceConfig } from "./configs/resource.config"
import { ValidatorModule } from "./core/modules/validator/validator.module"
import { hashConfig } from "./core/services/hash/hash.config"
import { AuthModule } from "./modules/authenticator/auth.module"
import { PostModule } from "./modules/post/post.module"
import { ResourceModule } from "./modules/resource/resource.module"
import { ResourceService } from "./modules/resource/resource.service"
import { RoleModule } from "./modules/role/role.module"
import { TagModule } from "./modules/tag/tag.module"
import { UserModule } from "./modules/user/user.module"

@Module({
  imports: [
    UserModule,
    TagModule,
    PostModule,
    RoleModule,
    AuthModule,
    ResourceModule,
    ValidatorModule,

    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig, hashConfig, resourceConfig],
    }),
    JwtModule.register({
      global: true,
      secret: "SECRET_KEY",
      signOptions: { expiresIn: "3h" },
    }),
    I18nModule.forRootAsync({
      useFactory(configService: ConfigService) {
        const { fallbackLocale } = configService.getOrThrow<AppConfig>("app")
        return {
          fallbackLanguage: fallbackLocale,
          loaderOptions: {
            path: join(__dirname, "/i18n/"),
            watch: true,
          },
          typesOutputPath: join(__dirname, "../../src/@types/i18n.d.ts"),
        }
      },
      resolvers: [
        { use: QueryResolver, options: ["lang", "l"] },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang", "x-custom-lang"]),
      ],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const dbConfig = configService.get("database")
        return dbConfig
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("Invalid options passed")
        }

        return addTransactionalDataSource(new DataSource(options))
      },
    }),
  ],
  controllers: [],
  providers: [ResourceService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  // async onModuleInit() {
  //   const mutation = this.dataSource.createEntityManager()
  //   const query = this.dataSource.createQueryBuilder()

  //   const data = (await query
  //     .createQueryBuilder()
  //     .select()
  //     .from("post_tags", "post_tags")
  //     .execute()) as any[]

  //   const bulkMutateData = data.map((item) => {
  //     const { postId, tagId } = item

  //     return { postId, tagId }
  //   })
  //   mutation.insert("post_to_tag", bulkMutateData as any)
  // }
}
