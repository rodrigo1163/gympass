import { hash } from 'bcryptjs'
import type { User } from '../../../prisma/generated/prisma/browser'
import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// SOLID
// D - Denpendency Inversion Principle
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
