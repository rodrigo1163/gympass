import type { UserCreateInput } from '../../../../prisma/generated/prisma/models'
import { prisma } from '../../../lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersReposity implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
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
