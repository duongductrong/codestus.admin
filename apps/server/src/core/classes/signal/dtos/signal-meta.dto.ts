import { IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { SignalMeta } from "../signal.interface"

export function SignalMetaDto() {
  class InnerSignalMeta implements SignalMeta {
    @IsNumber()
    @ApiProperty()
    page: number

    @IsNumber()
    @ApiProperty()
    size: number

    @IsNumber()
    @ApiProperty()
    total: number
  }

  return InnerSignalMeta
}
