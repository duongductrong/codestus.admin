import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { RefreshTokenCommand, RefreshTokenResult } from "./refresh-token.handler"

export class RefreshTokenRequestDto implements Omit<RefreshTokenCommand, "token"> {}

export class RefreshTokenResponseDto extends RefreshTokenResult {
  @ApiProperty()
  @IsString()
  expiredAt: string

  @ApiProperty()
  @IsString()
  token: string
}
