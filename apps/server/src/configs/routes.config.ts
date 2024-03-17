export const routes = {
  v1: {
    version: "1",
    users: {
      apiTag: "User",

      root: "/users",
      update: "/users/:id",
      delete: "/users/:id",
    },
    posts: {
      apiTag: "Post",

      root: "/posts",
      update: "/posts/:id",
      delete: "/posts/:id",
    },
    auth: {
      apiTag: "Auth",

      root: "/auth",
      login: "/auth/login",
      signUp: "/auth/signup",
    },
  },
} as const
