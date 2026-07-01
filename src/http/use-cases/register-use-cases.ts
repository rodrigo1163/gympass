import { hash } from 'bcryptjs'
import type { UsersRepository } from '../repositories/users-repository'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

// SOLID
// D - Denpendency Inversion Principle
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password }: RegisterUseCaseProps) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    const password_hash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
