import { z } from 'zod'

export const EventSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  from: z.string(),
  to: z.string(),
  reason: z.string(),
  status: z.string()
})

export type Event = z.infer<typeof EventSchema>