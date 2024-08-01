// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {prisma} from '@/lib/prisma'
import type {NextApiRequest, NextApiResponse} from 'next'

type UserDTO = {
  name: string
  username: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const {name, username} = req.body as UserDTO

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return res.status(201).json(user)
}
