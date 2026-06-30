import { hash } from 'bcryptjs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '@/lib/prisma'
import { registerUseCase } from '../use-cases/register-use-cases'

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
    await registerUseCase({
      name,
      email,
      password
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
