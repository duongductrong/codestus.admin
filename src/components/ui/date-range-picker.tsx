"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns/format"
import { toDate } from "date-fns/toDate"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/utils/tailwind"

export interface DateRangePickerExposeRef {}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  from: string | Date
  to: string | Date
  placeholder?: string
  numberOfMonths?: number
  inputClassName?: string
  displayFormat?: string

  onChange?: (state: DateRange) => void
}

export const DateRangePicker = React.forwardRef<DateRangePickerExposeRef, DateRangePickerProps>(
  (
    {
      className,
      inputClassName,
      from,
      to,
      displayFormat = "LLL dd, y",
      placeholder = "Select a date",
      numberOfMonths = 2,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: toDate(from),
      to: toDate(to),
    })

    React.useEffect(() => {
      if (date) {
        onChange?.(date)
      }
    }, [date])

    React.useImperativeHandle(ref, () => ({}))

    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
                inputClassName,
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, displayFormat)} - {format(date.to, displayFormat)}
                  </>
                ) : (
                  format(date.from, displayFormat)
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              {...props}
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={numberOfMonths}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
