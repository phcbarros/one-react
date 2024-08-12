import {getWeekDays} from '@/utils/get-week-days'
import {CaretLeft, CaretRight} from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

export function Calendar() {
  const weekDays = getWeekDays({short: true})

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>Agosto de 2024</CalendarTitle>
      </CalendarHeader>

      <CalendarActions>
        <button>
          <CaretLeft />
        </button>
        <button>
          <CaretRight />
        </button>
      </CalendarActions>
      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
