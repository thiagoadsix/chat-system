import { FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance) {
  app.get('/hello-world', async (request, reply) => {
    return { message: 'Hello World' }
  })
}