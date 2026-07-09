import { PrismaUsersReposity } from '@/http/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserProfileUseCase() {
  const prismaUsersReposity = new PrismaUsersReposity()
  const useCase = new GetUserProfileUseCase(prismaUsersReposity)

  return useCase
}
