// validar método
// obter dados do usuário
// obter data
// validar data not null
// validar usuario existe
// validar data passada =>retornar obj avaliability: []
// obter os intervalos do usuário por usuário e dia da semana
// se não tiver =>retornar obj avaliability: []
// se tiver busca os horários disponíveis

import {prisma} from '@/lib/prisma'
import dayjs from 'dayjs'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const selectedDate = String(req.query.date)

  if (!selectedDate) {
    return res.status(400).json({message: 'Date not provided'})
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({message: 'User does not exist'})
  }

  const referenceDate = dayjs(selectedDate)
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({availability: []})
  }

  const userIntervals = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userIntervals) {
    return res.json({availability: []})
  }

  // eslint-disable-next-line camelcase
  const {
    start_time_in_minutes: startTimeInMinutes,
    end_time_in_minutes: endTimeInMinutes,
  } = userIntervals

  const startHour = startTimeInMinutes / 60
  const endHour = endTimeInMinutes / 60

  const possibleTimes = Array.from({length: endHour - startHour}).map(
    (_, i) => {
      return startHour + i
    },
  )

  res.status(200).json({isAvailable: possibleTimes})
}
