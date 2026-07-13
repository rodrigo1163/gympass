import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../prisma/generated/prisma/client'
import { env } from '../env'

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL ?? env.DATABASE_URL
  const schema = new URL(connectionString).searchParams.get('schema') ?? undefined

  const adapter = new PrismaPg(
    { connectionString },
    schema ? { schema } : undefined,
  )

  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
  })
}

export const prisma = createPrismaClient()
