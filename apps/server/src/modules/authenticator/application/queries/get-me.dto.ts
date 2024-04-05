import { ApiProperty } from "@nestjs/swagger"
import { GetMeQuery, GetMeResult } from "./get-me.handler"

export class GetMeRequestDto extends GetMeQuery {}

export class GetMeResultDto implements GetMeResult {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty({ required: false })
  name?: string | null

  @ApiProperty({ type: Date, required: false })
  emailVerifiedAt?: Date

  @ApiProperty({ required: false })
  rememberToken?: string

  @ApiProperty({ required: false })
  provider?: string

  @ApiProperty({ required: false })
  avatar?: string

  @ApiProperty({ type: Date, required: false })
  createdAt?: Date

  @ApiProperty({ type: Date, required: false })
  updatedAt?: Date
}
