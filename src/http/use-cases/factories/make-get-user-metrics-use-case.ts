import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics-use-case'

export function makeGetUserMetricsUseCase() {
  const checkInReposity = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInReposity)

  return useCase
}
