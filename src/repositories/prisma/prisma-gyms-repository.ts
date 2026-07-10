import { prisma } from '@/lib/prisma'
import type { Gym } from '../../../prisma/generated/prisma/client'
import type { GymCreateInput } from '../../../prisma/generated/prisma/models'
import type { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(userId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: userId,
      },
    })

    return gym
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
  async create(data: GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
