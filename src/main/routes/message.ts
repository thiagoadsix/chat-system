import { FastifyInstance } from 'fastify'
import { adaptRoute } from '@application/adapters/fastify-routes.adapter'
import { sendMessageControllerFactory } from '@application/factories/controllers/send-message/send-message.controller.factory'

export default async function (app: FastifyInstance) {
  app.post('/messages', adaptRoute(sendMessageControllerFactory()))
}