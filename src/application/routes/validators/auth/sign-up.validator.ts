
import z from 'zod'

export const signUpSchemaBody = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

export const signUpSchemaResponse = z.null()
