import { FastifyInstance } from 'fastify'

import { health } from './health'

export const createRoutes = async (fastify: FastifyInstance) => {
  const routes = [health]

  routes.forEach(route => {
    fastify.register(route)
  })
}
