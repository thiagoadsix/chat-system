
import z from 'zod'

export const signInSchemaBody = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

export const signInSchemaResponse = z.object({
  token: z.string()
})
