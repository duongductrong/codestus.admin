import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common"
import { Request, Response } from "express"
import { Observable, catchError, map, throwError } from "rxjs"
import { Signal } from "./signal"
import { SignalPipeException } from "./signal.pipe"

@Injectable()
export class SignalInterceptor implements NestInterceptor {
  private responseHandler(
    res: Pick<Signal, "data" | "message" | "meta">,
    context: ExecutionContext,
  ) {
    const ctx = context.switchToHttp()

    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = HttpStatus.OK as number
    response.status(status).json({
      status: true,
      statusCode: status,
      path: request.url,
      result: res.data,
      meta: res.meta,
      message: res.message,
      timestamp: new Date().toISOString(),
    })
  }

  private errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const isDebugging = request.headers["x-custom-debug"]

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const signalException = exception?.getResponse?.() as SignalPipeException
    const result = signalException?.signalValidationPipe
      ? signalException.errors
      : exception?.cause ?? exception?.getResponse?.()

    return response.status(status).json({
      result,
      status: false,
      statusCode: status,
      path: request.url,
      meta: {},
      timestamp: new Date().toISOString(),
      message: exception.message,
      stack: isDebugging ? exception.stack : undefined,
      name: isDebugging ? exception.name : undefined,
    })
  }

  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<any> {
    return next.handle().pipe(
      map((res) => this.responseHandler(res as any, context)),
      catchError((err) => throwError(() => this.errorHandler(err, context))),
    )
  }
}
