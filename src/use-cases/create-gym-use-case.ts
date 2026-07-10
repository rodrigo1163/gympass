import type { Gym } from '../../prisma/generated/prisma/client'
import type { GymsRepository } from '../repositories/gyms-repository'

interface CreateGymUseCaseProps {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

// SOLID
// D - Denpendency Inversion Principle
export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone
  }: CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone
    })

    return {
      gym,
    }
  }
}
