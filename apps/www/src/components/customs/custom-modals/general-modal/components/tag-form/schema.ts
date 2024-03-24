import { z } from "zod"

export const tagFormSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/),
  description: z.string().nullish(),
})

export type TagFormSchema = z.infer<typeof tagFormSchema>
