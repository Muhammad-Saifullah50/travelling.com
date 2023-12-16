'use client'

import { DateRange, Range } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
interface CalendarProps {
  value: Range
  onChange: (value: Range) => void
  disabledDates?: Date[]
}
const Calendar = ({ value, onChange, disabledDates }: CalendarProps) => {
  return (
    <DateRange
      rangeColors={['#0369A1']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar
