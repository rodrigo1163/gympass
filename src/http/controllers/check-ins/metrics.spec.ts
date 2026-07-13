import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma.js'
import { jwtDecode } from 'jwt-decode';

describe('Check-In Metrics (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    const { app: server } = await import('../../../app.js')
    app = server
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get check-in metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { sub } = jwtDecode(token)

    if (!sub) {
        throw new Error('User ID not found')
    }

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -3.112425049934371,
        longitude: -59.95727487702569,
      },
    })

    await prisma.checkIn.createMany({
        data: [
            {
                gym_id: gym.id,
                user_id: sub,
            },
            {
                gym_id: gym.id,
                user_id: sub,
            },
            {
                gym_id: gym.id,
                user_id: sub,
            },
        ]
    })

    const response = await request(app.server)
    .get("/check-ins/metrics")
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(3)
  })
})
