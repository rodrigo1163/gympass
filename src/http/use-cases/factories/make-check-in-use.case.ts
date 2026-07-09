import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in-use-case'

export function makeCheckInUseCase() {
  const checkInReposity = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInReposity, gymsRepository)

  return useCase
}
