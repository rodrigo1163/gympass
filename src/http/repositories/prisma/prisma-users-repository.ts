import type { User } from '../../../../prisma/generated/prisma/browser'
import type { UserCreateInput } from '../../../../prisma/generated/prisma/models'
import { prisma } from '../../../lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersReposity implements UsersRepository {
  findById(userId: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
