export const routes = {
  v1: {
    version: "1",
    users: {
      apiTag: "User",

      root: "/users",
      update: "/users/:id",
    },
    auth: {
      apiTag: "Auth",

      root: "/auth",
      login: "/auth/login",
      signUp: "/auth/signup",
    },
  },
} as const
