import type { CheckIn } from '../../../prisma/generated/prisma/client'
import type { CheckInsRepository } from '../repositories/check-ins-repository'

interface FetchUserCheInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheInHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({
    userId,
    page
  }: FetchUserCheInHistoryUseCaseRequest): Promise<FetchUserCheInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
