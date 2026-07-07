import { PrismaUsersReposity } from '@/http/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  const prismaUsersReposity = new PrismaUsersReposity()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersReposity)

  return authenticateUseCase
}
