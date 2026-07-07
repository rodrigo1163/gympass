import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaUsersReposity } from '../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../use-cases/authenticate-use-case'
import { InvalidCredentialsError } from '../use-cases/erros/invalid-credentials-error'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersReposity = new PrismaUsersReposity()
    const authenticateUseCase = new AuthenticateUseCase(usersReposity)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(200).send()
}
