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
      create: "/posts",
      detail: "/posts/:id",
      update: "/posts/:id",
      delete: "/posts/:id",
    },
    tags: {
      apiTag: "Tag",

      root: "/tags",
      create: "/tags",
      detail: "/tags/:id",
      update: "/tags/:id",
      delete: "/tags/:id",
      bulkDelete: "/tags/bulk-delete",
    },
    auth: {
      apiTag: "Auth",

      root: "/auth",
      login: "/auth/login",
      signUp: "/auth/signup",
      getMe: "/auth/me",
      refreshToken: "/auth/refresh",
    },
  },
} as const
