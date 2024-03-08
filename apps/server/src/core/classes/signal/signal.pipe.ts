import { BadRequestException, HttpStatus, ValidationPipe } from "@nestjs/common"
import { ValidationError } from "class-validator"

export interface SignalPipeException {
  signalValidationPipe: boolean
  errors: (ValidationError & { messages: string[] })[]
}

export class SignalPipe {
  static create() {
    return new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
      exceptionFactory(originalErrors) {
        const errors = originalErrors.map((error) => {
          return {
            ...error,
            messages: Object.values(error.constraints ?? {}),
          }
        })
        return new BadRequestException({
          signalValidationPipe: true,
          errors,
        })
      },
    })
  }
}
