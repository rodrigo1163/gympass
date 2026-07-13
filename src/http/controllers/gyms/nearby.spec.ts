import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    const { app: server } = await import('../../../app.js')
    app = server
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1234567890',
        latitude: -3.112425049934371,
        longitude: -59.95727487702569,
    })

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
        title: 'Typescript Gym',
        description: 'Some description',
        phone: '1234567890',
        latitude: -3.0005973921913847,
        longitude: -60.04144014917132,
    })

    const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -3.112425049934371,
            longitude: -59.95727487702569,
        })
        .set('Authorization', `Bearer ${token}`)
        .send()
    console.log(response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
        expect.objectContaining({
            title: 'JavaScript Gym',
        })
    ])
  })
})
