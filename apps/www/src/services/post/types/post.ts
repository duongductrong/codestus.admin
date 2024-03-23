export interface Post {
  id: number
  title: string
  views: number
  thumbnail?: string
  slug: string
  description?: string
  content?: string
  status: number
  createdAt: Date
  updatedAt: Date
  publishAt: Date
  love: number
  unlove: number
  // user: UserProps
  // tags: TagProps[]
}
