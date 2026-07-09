import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms-use-case'

// Unit testing

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      latitude: -3.112425049934371,
      longitude: -59.95727487702569,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      latitude: -3.112425049934371,
      longitude: -59.95727487702569,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Java',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym', })
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        latitude: -3.112425049934371,
        longitude: -59.95727487702569,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
