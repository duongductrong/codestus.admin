import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common"
import { Response } from "express"

@Catch(HttpException)
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    if (exception instanceof HttpException) {
      const status = exception.getStatus()

      response.status(status).json({
        statusCode: status,
        message: exception.message,
        data: {
          stack: exception.stack,
          path: request.url,
          timestamp: new Date().toISOString(),
        },
      })
      return
    }

    response.status(500).json({ message: "Unknown" })
  }
}
