import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaUsersReposity } from '../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../use-cases/register-use-cases'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersReposity = new PrismaUsersReposity()
    const registerUseCase = new RegisterUseCase(prismaUsersReposity)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
