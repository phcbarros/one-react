import {Calendar} from '@/components/calendar'
import {useState} from 'react'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onSelectedDate={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            Terça-feira, <span>20 de setembro</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
