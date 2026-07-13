import type { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate-controller'
import { registerController } from './register-controller'
import { profileController } from './profile-controller'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refreshController } from './refrash-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
