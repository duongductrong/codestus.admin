import { FilterFn } from "@tanstack/react-table"
import { toDate } from "date-fns/toDate"

export const isWithinDateRange: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId) as string
  const date = toDate(rowValue)
  const [start, end] = value // value => two date input values
  // If one filter defined and date is null filter it
  if ((start || end) && !date) return false
  if (start && !end) {
    return date.getTime() >= start.getTime()
  }
  if (!start && end) {
    return date.getTime() <= end.getTime()
  }
  if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
  }

  return true
}
