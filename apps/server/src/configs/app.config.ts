import { registerAs } from "@nestjs/config"

export const app = registerAs("app", () => ({
  version: 1,

  locale: "en",
  fallbackLocale: "en",
  localeResolvers: {
    headers: ["x-lang", "x-custom-lang"],
    query: ["lang", "l"],
  },
}))

export type AppConfig = ReturnType<typeof app>
