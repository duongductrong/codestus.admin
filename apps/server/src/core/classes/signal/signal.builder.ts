import { HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { Signal } from "./signal"
import { SignalMeta } from "./signal.interface"

export class SignalBuilder<TData = unknown> {
  private signal: Signal<TData, SignalMeta>

  constructor() {
    this.signal = new Signal<TData, SignalMeta>()
  }

  static create() {
    return new SignalBuilder()
  }

  setData<T extends TData>(data: T): SignalBuilder<T> {
    this.signal.data = data
    return this as unknown as SignalBuilder<T>
  }

  setMessage(message: string) {
    this.signal.message = message
    return this
  }

  setMeta<T extends SignalMeta>(pagination: T) {
    this.signal.meta = pagination
    return this
  }

  throwException(exception: HttpException | Error) {
    if (exception instanceof HttpException) {
      throw new HttpException(exception?.getResponse?.(), exception?.getStatus?.(), {
        cause: exception.cause,
        description: exception.name,
      })
    }

    if (exception instanceof Error) {
      throw new InternalServerErrorException(exception.message, { cause: exception.stack })
    }
  }

  build() {
    if (!this.signal.message || !this.signal.data)
      throw new Error("Missing Signal properties included in (message, data).")

    return {
      data: this.signal.getData(),
      message: this.signal.getMessage(),
      meta: this.signal.getMeta(),
    }
  }
}
