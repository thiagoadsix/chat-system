import z from 'zod'

export const updateMessageSchemaBody = z.object({
  content: z.string().min(1)
})

export const updateMessageSchemaParams = z.object({
  chatId: z.string(),
  messageId: z.string()
})

export const updateMessageSchemaResponse = z.null()
