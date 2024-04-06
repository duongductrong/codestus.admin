import { Post } from "@/services/post/types"

export interface Tag {
  id: number
  name: string
  slug: string
  description?: string | null
  posts?: Post[]
  createdAt?: string
  updatedAt?: string
}
