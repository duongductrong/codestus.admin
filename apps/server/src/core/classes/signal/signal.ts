import { Nullable } from "@server/types/type-utils"

export interface SignalConstructor<TData, TMeta = unknown> {
  message: string
  data: TData
  meta?: TMeta
}

export class Signal<TData = unknown, TMeta = unknown> {
  message: string

  data: Nullable<TData>

  meta?: Nullable<TMeta>

  constructor() {
    this.message = ""
    this.data = null
    this.meta = null
  }

  getData() {
    return this.data
  }

  getMessage() {
    return this.message
  }

  getMeta() {
    return this.meta
  }
}
