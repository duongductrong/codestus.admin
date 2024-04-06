import { ClassSerializerInterceptor, VERSION_NEUTRAL, VersioningType } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { useContainer } from "class-validator"
import { initializeTransactionalContext } from "typeorm-transactional"
import { AppModule } from "./app.module"
import { SignalInterceptor } from "./core/classes/signal/signal.interceptor"
import { SignalPipe } from "./core/classes/signal/signal.pipe"

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: ["http://localhost:3000", "http://localhost:5173"] })

  app.setGlobalPrefix("/api")
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: VERSION_NEUTRAL })
  app.useGlobalInterceptors(
    new SignalInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )
  app.useGlobalPipes(SignalPipe.create())

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = new DocumentBuilder()
    .setTitle("Document API")
    .setDescription("The summary document api")
    .setVersion("1.0")
    .addBearerAuth({ type: "apiKey" })
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("/docs", app, document)

  await app.listen(process.env.PORT || 8000)
}
bootstrap()
