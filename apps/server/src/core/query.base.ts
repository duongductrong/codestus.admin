/**
 * Base class for regular queries
 */

import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class OrderBy {
  @ApiProperty({ default: "createdAt", required: false })
  @IsString()
  @IsOptional()
  field: string

  @ApiProperty({ enum: ["asc", "desc", "ASC", "DESC"], default: "desc", required: false })
  @IsString()
  @IsOptional()
  value: "asc" | "desc" | "ASC" | "DESC"
}

export type PaginatedQueryParams = {
  limit: number
  page: number
  offset: number
  orderBy: OrderBy
}

export abstract class BaseQuery {}

/**
 * Base class for paginated queries
 */
export abstract class BasePaginationQuery extends BaseQuery {
  @ApiProperty({ description: "Limit size of records", default: 12, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (typeof value === "string" ? Number(value) : value))
  limit: number

  @ApiProperty({ description: "Offset records", default: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (typeof value === "string" ? Number(value) : value))
  offset: number

  @ApiProperty({ description: "Sorting the record by field", required: false })
  @IsOptional()
  orderBy?: OrderBy

  @ApiProperty({
    description: "Page index of record list",
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (typeof value === "string" ? Number(value) : value))
  page: number

  constructor(props: PaginationParams<BasePaginationQuery>) {
    super()
    this.limit = props?.limit || 12
    this.offset = props?.page ? props.page * this.limit : 0
    this.page = props?.page || 0
    this.orderBy = props?.orderBy || undefined
  }
}

// Paginated query parameters
export type PaginationParams<T> = Omit<T, "limit" | "offset" | "orderBy" | "page"> &
  Partial<Omit<PaginatedQueryParams, "offset">>
