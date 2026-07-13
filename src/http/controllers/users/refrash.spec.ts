import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Refresh (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    const { app: server } = await import('../../../app.js')
    app = server
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh', async () => {
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

      const cookies = authResponse.get('Set-Cookie') ?? []

      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
