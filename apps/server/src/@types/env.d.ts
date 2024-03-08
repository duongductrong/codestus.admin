declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_TYPE: string
      DATABASE_HOST: string
      DATABASE_PORT: string
      DATABASE_USERNAME: string
      DATABASE_NAME: string
      NODE_ENV: "development" | "production"
      PORT?: string
      PWD: string
    }
  }
}
