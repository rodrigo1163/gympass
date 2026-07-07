import type { User } from '../../../../prisma/generated/prisma/browser'
import type { UserCreateInput } from '../../../../prisma/generated/prisma/models'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string) {
    const user = this.items.find(item => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
