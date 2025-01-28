import { z } from 'zod'

export const ManagerSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string()
})

export type Manager = z.infer<typeof ManagerSchema> 