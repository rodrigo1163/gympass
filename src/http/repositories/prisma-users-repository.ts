import { prisma } from '@/lib/prisma'
import type { UserCreateInput } from '../../../prisma/generated/prisma/models'

export class PrismaUsersReposity {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data
    })
    return user
  }
}
