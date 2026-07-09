import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheInHistoryUseCase } from '../fetch-user-check-ins-history-use-case'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheInHistoryUseCase(checkInsRepository)

  return useCase
}
