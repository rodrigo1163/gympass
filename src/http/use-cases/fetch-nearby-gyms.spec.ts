import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case'

// Unit testing

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch neraby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      latitude: -3.112425049934371,
      longitude: -59.95727487702569,
      phone: null,
    })

    await gymsRepository.create({
      title: 'For Gym',
      description: null,
      latitude: -3.0005973921913847,
      longitude: -60.04144014917132,
      phone: null,
    })

    // -3.0005973921913847, -60.04144014917132

    const { gyms } = await sut.execute({
      userLatitude: -3.112425049934371,
      userLongitude: -59.95727487702569,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym', })
    ])
  })
})
