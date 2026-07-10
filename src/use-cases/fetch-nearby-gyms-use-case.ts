import type { Gym } from '../../prisma/generated/prisma/client'
import type { GymsRepository } from '../repositories/gyms-repository'

interface FetchNearbyGymsUseCaseProps {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

// SOLID
// D - Denpendency Inversion Principle
export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseProps): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms,
    }
  }
}
