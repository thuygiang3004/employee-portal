import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(0).max(120)
})

export type User = z.infer<typeof UserSchema> 