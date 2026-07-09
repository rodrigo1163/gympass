import type { Gym } from '../../../prisma/generated/prisma/client'

export interface GymsRepository {
  findById(userId: string): Promise<Gym | null>
}
