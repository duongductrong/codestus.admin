import { Post } from "@/services/post/types"

export interface Tag {
  id: number
  name: string
  slug: string
  description?: string
  posts?: Post[]
  createdAt?: string
  updatedAt?: string
}
