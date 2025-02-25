import z from 'zod'

export const createChatSchemaBody = z.object({
  participants: z.array(z.string())
})

export const createChatSchemaResponse = z.object({
  id: z.string(),
})
