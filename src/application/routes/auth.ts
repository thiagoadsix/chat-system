import { FastifyInstance } from 'fastify'

import { adaptRoute } from '@application/adapters/fastify-routes.adapter'
import { signUpControllerFactory } from '@application/factories/controllers/auth/sign-up.controller.factory'
import { signInControllerFactory } from '@application/factories/controllers/auth/sign-in.controller.factory'

export default async function (app: FastifyInstance) {
  app.post('/auth/sign-up', adaptRoute(signUpControllerFactory()))
  app.post('/auth/sign-in', adaptRoute(signInControllerFactory()))
}
