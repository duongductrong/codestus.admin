import { registerAs } from "@nestjs/config"

export const hashConfig = registerAs("hash", () => ({
  saltOrRounds: 10,
}))

export type HashConfig = ReturnType<typeof hashConfig>
