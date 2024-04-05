export const PAGE_ROUTES = {
  HOME: "/",
  COMPONENTS: "/components",

  ADMIN: {
    POST_LIST: "/admin/posts",
    POST_CREATE: "/admin/posts/create",
    POST_EDIT: "/admin/posts/:id",

    CATEGORY_LIST: "/admin/categories",
  },

  AUTH: {
    SIGN_IN: "/login",
    SIGN_UP: "/sign-up",
  },
} as const
