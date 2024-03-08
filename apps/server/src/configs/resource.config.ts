import { registerAs } from "@nestjs/config"

export const resource = registerAs(
  "resource",
  () => ["user", "product", "voucher", "role"] as const,
)

export type ResourceConfig = ReturnType<typeof resource>
