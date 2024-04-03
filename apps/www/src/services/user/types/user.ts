export interface User {
  id: number
  password: string
  email: string
  name?: string | null
  emailVerifiedAt?: Date
  rememberToken?: string
  provider?: string
  providerId?: string
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}
