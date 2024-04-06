import { Tag } from "@/services/tag/types"

export interface Post {
  id: number
  title: string
  views: number
  thumbnail?: string
  slug: string
  description?: string
  content?: string
  status: number
  createdAt: string
  updatedAt: string
  publishAt?: string
  love: number
  unlove: number
  // user: UserProps
  tags: Tag[]
}
