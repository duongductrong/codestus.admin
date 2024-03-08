import { HttpStatus } from "@nestjs/common"

export interface SignalMeta {
  page: number
  size: number
  total: number
}

export interface SignalResponse<T, M> {
  status: boolean
  statusCode: HttpStatus
  path: string
  result: T | T[]
  meta?: M
  message: string
  timestamp: string
}

export interface SignalError<T, M = any> extends SignalResponse<T, M> {
  stack?: string
  name?: string
}
