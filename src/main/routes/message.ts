import { FastifyInstance } from 'fastify'

import { adaptRoute } from '@application/adapters/fastify-routes.adapter'
import { sendMessageControllerFactory } from '@application/factories/controllers/send-message/send-message.controller.factory'
import { deleteMessageControllerFactory } from '@application/factories/controllers/delete-message/delete-message.controller.factory'
import { replyMessageControllerFactory } from '@application/factories/controllers/reply-message/reply-message.controller.factory'
import { updateMessageControllerFactory } from '@application/factories/controllers/update-message/update-message.controller.factory'

export default async function (app: FastifyInstance) {
  app.post('/messages', adaptRoute(sendMessageControllerFactory()))
  app.delete('/messages/:id', adaptRoute(deleteMessageControllerFactory()))
  app.post('/messages/:id/replies', adaptRoute(replyMessageControllerFactory()))
  app.put('/messages/:id', adaptRoute(updateMessageControllerFactory()))
}