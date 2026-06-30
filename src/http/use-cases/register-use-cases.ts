import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersReposity } from '../repositories/prisma-users-repository'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ email, name, password }: RegisterUseCaseProps) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const password_hash = await hash(password, 8)

  const prismaUsersReposity = new PrismaUsersReposity()

  await prismaUsersReposity.create({
    name,
    email,
    password_hash
  })
}
