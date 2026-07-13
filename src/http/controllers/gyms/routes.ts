import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createGymBodyController } from './create-controller'
import { searchGymsController } from './search-controller'
import { nearbyGymsController } from './nearby-controller'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms', createGymBodyController)
    
    app.get('/gyms/search', searchGymsController)
    app.get('/gyms/nearby', nearbyGymsController)
}
