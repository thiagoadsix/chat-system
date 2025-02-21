import Fastify, { FastifyInstance } from 'fastify'
import setupRoutes from './routes'

const app: FastifyInstance = Fastify({
  logger: true,
})

setupRoutes(app)

export default app
