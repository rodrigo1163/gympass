import { PrismaUsersReposity } from "@/http/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register-use-case"

export function makeRegisterUseCase() {
  const prismaUsersReposity = new PrismaUsersReposity()
  const registerUseCase = new RegisterUseCase(prismaUsersReposity)

  return registerUseCase
}