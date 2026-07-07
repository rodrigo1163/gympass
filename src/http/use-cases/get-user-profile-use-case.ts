import { compare } from 'bcryptjs'
import type { User } from '../../../prisma/generated/prisma/browser'
import type { UsersRepository } from '../repositories/users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
