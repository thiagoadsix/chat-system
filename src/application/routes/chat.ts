import { FastifyInstance } from 'fastify'

import { authMiddleware } from '@application/middleware'
import { adaptRoute } from '@application/adapters/fastify-routes.adapter'

import { sendMessageControllerFactory } from '@application/factories/controllers/message/send-message/send-message.controller.factory'
import { deleteMessageControllerFactory } from '@application/factories/controllers/message/delete-message/delete-message.controller.factory'
import { updateMessageControllerFactory } from '@application/factories/controllers/message/update-message/update-message.controller.factory'
import { replyMessageControllerFactory } from '@application/factories/controllers/message/reply-message/reply-message.controller.factory'
import { createChatControllerFactory } from '@application/factories/controllers/chat/create-chat/create-chat.controller'

export default async function (app: FastifyInstance) {
  app.post('/chats', { preHandler: [authMiddleware] }, adaptRoute(createChatControllerFactory()))

  app.post('/chats/:chatId/messages', { preHandler: [authMiddleware] }, adaptRoute(sendMessageControllerFactory()))
  app.delete('/chats/:chatId/messages/:messageId', { preHandler: [authMiddleware] }, adaptRoute(deleteMessageControllerFactory()))
  app.patch('/chats/:chatId/messages/:messageId', { preHandler: [authMiddleware] }, adaptRoute(updateMessageControllerFactory()))
  app.post('/chats/:chatId/messages/:messageId/replies', { preHandler: [authMiddleware] }, adaptRoute(replyMessageControllerFactory()))
}