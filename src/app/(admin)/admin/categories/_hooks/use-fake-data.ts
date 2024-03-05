import { useMemo } from "react"
import { faker } from "@faker-js/faker"

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export const useFakeData = () =>
  useMemo<Category[]>(
    () =>
      Array(500)
        .fill(1)
        .map<Category>((_, index) => ({
          id: faker.database.mongodbObjectId(),
          name: faker.person.jobType(),
          slug: faker.person.zodiacSign(),
          description: faker.person.jobDescriptor(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
    [],
  )
