import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma.js'

describe('Create Check-In (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    const { app: server } = await import('../../../app.js')
    app = server
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -3.112425049934371,
        longitude: -59.95727487702569,
      },
    })

    const response = await request(app.server)
    .post(`/gyms/${gym.id}/check-ins`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        latitude: -3.112425049934371,
        longitude: -59.95727487702569,
    })

    expect(response.statusCode).toEqual(201)
  })
})
