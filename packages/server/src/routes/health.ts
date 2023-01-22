import { FastifyInstance } from 'fastify'

export const health = async (fastify: FastifyInstance) => {
  fastify.get('/health', async (_, reply) => {
    reply.send('i"m alive!').status(200)
  })
}
