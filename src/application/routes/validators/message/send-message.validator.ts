import z from 'zod'

export const sendMessageSchemaBody = z.object({
  content: z.string().min(1)
})

export const sendMessageSchemaParams = z.object({
  chatId: z.string()
})

export const sendMessageSchemaResponse = z.null()
