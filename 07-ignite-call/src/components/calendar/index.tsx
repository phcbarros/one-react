import {api} from '@/lib/axios'
import {getWeekDays} from '@/utils/get-week-days'
import {useQuery} from '@tanstack/react-query'
import dayjs from 'dayjs'
import {useRouter} from 'next/router'
import {CaretLeft, CaretRight} from 'phosphor-react'
import {useMemo, useState} from 'react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  onSelectedDate: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
}

export function Calendar({onSelectedDate}: Readonly<CalendarProps>) {
  const weekDays = getWeekDays({short: true})
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()
  const username = String(router.query.username)

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')
    setCurrentDate(nextMonth)
  }

  const {data: blockedDates} = useQuery<BlockedDates>({
    queryKey: [
      'blocked-dates',
      username,
      currentDate.get('year'),
      currentDate.get('month'),
    ],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })

      return response.data
    },
  })

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const previousMonthFillArray = Array.from({
      length: currentDate.get('day'),
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastCurrentDayInMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastCurrentDayInMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastCurrentDayInMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {date, disabled: true}
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates?.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {date, disabled: true}
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>de {currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button title="Mês anterior" onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button title="Proximo mês" onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({week, days}) => {
            return (
              <tr key={week}>
                {days.map(({date, disabled}) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        disabled={disabled}
                        onClick={() => onSelectedDate(date.toDate())}>
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
