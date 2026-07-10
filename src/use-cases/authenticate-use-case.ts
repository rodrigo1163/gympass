import { compare } from 'bcryptjs'
import type { User } from '../../prisma/generated/prisma/browser'
import type { UsersRepository } from '../repositories/users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPassowrdMatches = await compare(password, user.password_hash)

    if (!doesPassowrdMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
