import z from 'zod'

export const replyMessageSchemaBody = z.object({
  content: z.string().min(1)
})

export const replyMessageSchemaParams = z.object({
  chatId: z.string(),
  messageId: z.string()
})

export const replyMessageSchemaResponse = z.null()
