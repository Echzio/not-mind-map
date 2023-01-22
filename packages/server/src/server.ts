import fastify from 'fastify'

import { createRoutes } from './routes'

const fastifyInstance = fastify({ logger: true })

export const createServer = async () => {
  try {
    await createRoutes(fastifyInstance)

    await fastifyInstance.listen({ port: 3000 })
  } catch (error) {
    fastifyInstance.log.error(error)
    process.exit(1)
  }
}
