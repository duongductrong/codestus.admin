import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from "class-validator"
import { SignalError } from "../signal.interface"

export function SignalErrorDto<T, M>(_errorCls?: any | any[], _metaCls?: any) {
  class InnerSignalErrorDto implements SignalError<T, M> {
    @IsString()
    @IsOptional()
    @ApiProperty()
    stack?: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    status: boolean

    @IsEnum(HttpStatus)
    @ApiProperty()
    statusCode: HttpStatus

    @IsString()
    @ApiProperty()
    path: string

    @ApiProperty({ type: _errorCls })
    result: T | T[]

    @IsObject()
    @IsOptional()
    @ApiProperty({ type: _metaCls })
    meta?: M

    @IsString()
    @ApiProperty()
    message: string

    @IsString()
    @ApiProperty()
    timestamp: string

    constructor({
      message,
      path,
      result,
      status,
      statusCode,
      timestamp,
      meta,
      name,
      stack,
    }: SignalError<T, M>) {
      this.message = message
      this.path = path
      this.result = result
      this.status = status
      this.statusCode = statusCode
      this.timestamp = timestamp
      this.meta = meta
      this.name = name
      this.stack = stack
    }
  }

  return InnerSignalErrorDto
}
