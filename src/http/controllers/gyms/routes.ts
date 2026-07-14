import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createGymBodyController } from './create-controller'
import { searchGymsController } from './search-controller'
import { nearbyGymsController } from './nearby-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGymBodyController)

    app.get('/gyms/search', searchGymsController)
    app.get('/gyms/nearby', nearbyGymsController)
}
