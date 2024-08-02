import {Adapter} from 'next-auth/adapters'
import {prisma} from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {},
    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({where: {id}})

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({where: {email}})

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByAccount({providerAccountId, provider}) {
      const account = await prisma.account.findFirstOrThrow({
        where: {
          provider_account_id: providerAccountId,
          provider
        },
        include: {
          user: true
        }
      })

      return {
        id: account.user.id,
        name: account.user.name,
        username: account.user.username,
        email: account.user.email!,
        emailVerified: null,
        avatar_url: account.user.avatar_url!,
      }
    }

    async updateUser(user) {},

    async deleteUser(userId) {},

    async linkAccount(account) {},

    async unlinkAccount({providerAccountId, provider}) {}

    async createSession({sessionToken, userId, expires}) {}

    async getSessionAndUser(sessionToken) {},

    async updateSession(sessionToken) {},

    async deleteSession(sessionToken) {},

    async createVerificationToken({identifier, token, expires}) {},

    async useVerificationToken({identifier, token}) {},
  }

}
