import type { User } from '../../../prisma/generated/prisma/browser'
import type { UserCreateInput } from '../../../prisma/generated/prisma/models'

export interface UsersRepository {
  create(data: UserCreateInput): Promise<User>
}
