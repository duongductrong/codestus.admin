/* eslint-disable react/no-array-index-key */
import { CalendarIcon } from "@radix-ui/react-icons"
import {
  setDate as setDayInMonth,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  toDate,
} from "date-fns"
import { format as _format } from "date-fns/format"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { SelectSingleEventHandler } from "react-day-picker"
import { cn } from "../../libs/utils/tailwind"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface DatePickerExposeRef {}

export interface DatePickerProps {
  placeholder?: string
  /**
   * Format based on date-fns
   */
  format?: string
  initialFocus?: boolean
  className?: string
  fullWidth?: boolean
  value?: string | Date
  withTime?: boolean
  onChange?: (date?: string) => void
}

export const DatePicker = forwardRef<DatePickerExposeRef, DatePickerProps>(
  (
    {
      placeholder = "Select a date",
      format = "PPP",
      initialFocus = true,
      className,
      fullWidth,
      value,
      withTime,
      onChange,
    },
    ref,
  ) => {
    const [date, setDate] = useState<Date | undefined>(value ? toDate(value) : undefined)

    const showNumberBeauty = (val: number) => (val < 10 ? `0${val}` : val)

    const handleTimeUnitChange = (val: number | string, type: "hours" | "seconds" | "minutes") => {
      if (!date) return

      switch (type) {
        case "hours":
          setDate(setHours(date, Number(val)))
          break
        case "minutes":
          setDate(setMinutes(date, Number(val)))
          break
        case "seconds":
          setDate(setSeconds(date, Number(val)))
          break
        default:
      }
    }

    const handleChangeDate: SelectSingleEventHandler = (selectedDate) => {
      if (date && selectedDate) {
        const newDate = setYear(
          setMonth(setDayInMonth(date, selectedDate.getDate()), selectedDate.getMonth()),
          selectedDate.getFullYear(),
        )

        setDate(newDate)
        return
      }

      setDate(selectedDate)
    }

    useEffect(() => {
      if (date) {
        onChange?.(date.toISOString())
      }
    }, [date])

    useImperativeHandle(ref, () => ({}))

    const seconds = date?.getSeconds()
    const minutes = date?.getMinutes()
    const hours = date?.getHours()

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              fullWidth ? "w-full" : null,
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? _format(date, format) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col items-center justify-center p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleChangeDate}
            initialFocus={initialFocus}
          />
          {withTime ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-2 border-t p-3">
              <select
                className="rounded-md border px-2 py-1 text-sm"
                onChange={(val) => handleTimeUnitChange(val.target.value, "hours")}
                value={hours}
              >
                {Array(24)
                  .fill(1)
                  .map((_, index) => (
                    <option key={index} value={index}>
                      {showNumberBeauty(index)}
                    </option>
                  ))}
              </select>
              :
              <select
                className="rounded-md border px-2 py-1 text-sm"
                onChange={(val) => handleTimeUnitChange(val.target.value, "minutes")}
                value={minutes}
              >
                {Array(60)
                  .fill(1)
                  .map((_, index) => (
                    <option key={index} value={index}>
                      {showNumberBeauty(index)}
                    </option>
                  ))}
              </select>
              :
              <select
                className="rounded-md border px-2 py-1 text-sm"
                onChange={(val) => handleTimeUnitChange(val.target.value, "seconds")}
                value={seconds}
              >
                {Array(60)
                  .fill(1)
                  .map((_, index) => (
                    <option key={index} value={index}>
                      {showNumberBeauty(index)}
                    </option>
                  ))}
              </select>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    )
  },
)
