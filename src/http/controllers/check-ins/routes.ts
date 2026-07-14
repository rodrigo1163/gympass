import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { createCheckInController } from './create-controller'
import { historyCheckInsController } from './history-controller'
import { metricsCheckInsController } from './metrics-controller'
import { validateCheckInController } from './validate-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/:gymId/check-ins', createCheckInController)
    app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, validateCheckInController)
    app.get('/check-ins/history', historyCheckInsController)
    app.get('/check-ins/metrics', metricsCheckInsController)
}
