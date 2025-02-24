import { FastifyInstance } from 'fastify'
import autoLoad from '@fastify/autoload'
import { join } from 'path'

export default (app: FastifyInstance): void => {
  app.register(autoLoad, {
    dir: join(__dirname, '..', 'routes'),
    options: { prefix: '/api' },
  })
}