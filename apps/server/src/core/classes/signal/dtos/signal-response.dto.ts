import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from "class-validator"
import { SignalResponse } from "../signal.interface"

export function SignalResponseDto<T, M>(_resultCls?: any | any[], _metaCls?: any) {
  class InnerSignalResponseDto implements SignalResponse<T, M> {
    @IsBoolean()
    @ApiProperty()
    status: boolean

    @IsEnum(HttpStatus)
    @ApiProperty()
    statusCode: HttpStatus

    @IsString()
    @ApiProperty()
    path: string

    @ApiProperty({ type: _resultCls })
    data: T | T[]

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
      meta,
      path,
      data,
      status,
      statusCode,
      timestamp,
    }: SignalResponse<T, M>) {
      this.statusCode = statusCode
      this.message = message
      this.data = data
      this.status = status
      this.timestamp = timestamp
      this.path = path
      this.meta = meta
    }
  }

  return InnerSignalResponseDto
}
