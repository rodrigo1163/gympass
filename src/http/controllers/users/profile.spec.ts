import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Profile (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    const { app: server } = await import('../../../app.js')
    app = server
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'john.doe@example.com',
        password: '123456',
      })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
    .get('/me')
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
        expect.objectContaining({
            email: 'john.doe@example.com',
        })
    )
  })
})
