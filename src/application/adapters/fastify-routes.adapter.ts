import { FastifyRequest, FastifyReply } from 'fastify'

import { Controller, HttpRequest } from '@presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      jwtSign: res.jwtSign.bind(res),
      userId: req.user?.id
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).send({
        error: {
          message: httpResponse.body.message,
          name: httpResponse.body.name,
          stack: httpResponse.body.stack
        }
      })
    }
  }
}
