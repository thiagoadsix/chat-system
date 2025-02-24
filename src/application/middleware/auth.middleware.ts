import { FastifyRequest, FastifyReply } from 'fastify'

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ error: 'Not authorized' })
  }
}