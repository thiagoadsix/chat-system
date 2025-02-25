import z from 'zod'

export const deleteMessageSchemaParams = z.object({
  chatId: z.string(),
  messageId: z.string()
})

export const deleteMessageSchemaResponse = z.null()
