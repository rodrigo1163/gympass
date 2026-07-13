import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createCheckInController } from './create-controller'
import { historyCheckInsController } from './history-controller'
import { metricsCheckInsController } from './metrics-controller'
import { validateCheckInController } from './validate-controller'

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/:gymId/check-ins', createCheckInController)
    app.patch('/check-ins/:checkInId/validate', validateCheckInController)
    app.get('/check-ins/history', historyCheckInsController)
    app.get('/check-ins/metrics', metricsCheckInsController)
}
