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

  build() {
    if (!this.signal.message || !this.signal.data)
      throw new Error("Missing Signal properties included in (message, data).")

    return {
      data: this.signal.getData(),
      message: this.signal.getMessage(),
      pagination: this.signal.getMeta(),
    }
  }
}
