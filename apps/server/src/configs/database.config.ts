import { registerAs } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const database = registerAs<TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>>(
  "database",
  () => ({
    name: process.env.DATABASE_NAME || "default",
    type: process.env.DATABASE_TYPE as any,
    port: Number(process.env.DATABASE_PORT) || 8000,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: ["../modules/**/*.entity{.ts,.js}"],
    migrations: ["../database/migrations/*{.ts,.js}"],
    subscribers: ["../modules/**/*.subscriber{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
    debug: false,
  }),
)
