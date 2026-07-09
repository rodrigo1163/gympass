import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym-use-case'

// Unit testing

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      latitude: -3.112425049934371,
      longitude: -59.95727487702569,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
