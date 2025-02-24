import Fastify, { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt'

import setupRoutes from './routes'
import env from './env'

const app: FastifyInstance = Fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.jwtSecret,
})
setupRoutes(app)

export default app
