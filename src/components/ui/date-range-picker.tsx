"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format, toDate } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/utils/tailwind"

export interface DateRangePickerExposeRef {}

export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  from: string | Date
  to: string | Date
  placeholder?: string
  numberOfMonths?: number
}

export const DateRangePicker = React.forwardRef<DateRangePickerExposeRef, DateRangePickerProps>(
  ({ className, from, to, placeholder = "Select a date", numberOfMonths = 2 }, ref) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: toDate(from),
      to: toDate(to),
    })

    React.useImperativeHandle(ref, () => ({}))

    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
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
