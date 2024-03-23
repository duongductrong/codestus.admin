"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns/format"
import { toDate } from "date-fns/toDate"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { PopoverClose } from "@radix-ui/react-popover"
import { addMilliseconds } from "date-fns/addMilliseconds"
import { addMinutes } from "date-fns/addMinutes"
import { addSeconds } from "date-fns/addSeconds"
import { Button, ButtonProps } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "../../utils/tailwind"

export interface DateRangePickerExposeRef {}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: string
  numberOfMonths?: number
  inputClassName?: string
  displayFormat?: string
  previewFormat?: string

  immediately?: boolean

  value?: DateRange
  onChange?: (state: DateRange) => void

  cancelText?: string
  cancelSize?: ButtonProps["size"]
  saveText?: string
  saveSize?: ButtonProps["size"]
}

export const DateRangePicker = React.forwardRef<DateRangePickerExposeRef, DateRangePickerProps>(
  (
    {
      className,
      inputClassName,
      displayFormat = "LLL dd, y",
      previewFormat = "yyyy/MM/dd",
      placeholder = "Select a date range",
      numberOfMonths = 2,
      immediately = false,
      value,
      cancelText = "Cancel",
      cancelSize = "sm",
      saveText = "Save changes",
      saveSize = "sm",
      onChange,
      ...props
    },
    ref,
  ) => {
    const initialValues = {
      from: value?.from
        ? addMilliseconds(addSeconds(addMinutes(toDate(value.from), 0), 0), 0)
        : undefined,
      to: value?.to
        ? addMilliseconds(addSeconds(addMinutes(toDate(value.to), 0), 0), 0)
        : undefined,
    }

    const [dateKeeper, setDateKeeper] = React.useState<DateRange | undefined>(initialValues)
    const [date, setDate] = React.useState<DateRange | undefined>(initialValues)

    const setDateRangeChange = (dateRangeState: DateRange) => {
      setDate(dateRangeState)
      onChange?.(dateRangeState)
    }

    const resetDateRangeByValue = () => {
      setDateKeeper(value)
      setDate(value)
    }

    // Reset controlled state by prop
    React.useEffect(resetDateRangeByValue, [(value?.from, value?.to)])

    React.useImperativeHandle(ref, () => ({}))

    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-fit min-w-[100px] justify-start text-left font-normal",
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
              selected={immediately ? date : dateKeeper}
              onSelect={immediately ? setDate : setDateKeeper}
              numberOfMonths={numberOfMonths}
            />

            {!immediately ? (
              <div className="flex flex-wrap items-center justify-end gap-2 border-t p-3">
                {dateKeeper?.from && dateKeeper.to ? (
                  <p className="text-xs">
                    {dateKeeper?.from ? format(toDate(dateKeeper?.from as Date), previewFormat) : null}
                    {" - "}
                    {dateKeeper?.to ? format(toDate(dateKeeper?.to as Date), previewFormat) : null}
                  </p>
                ) : null}
                <PopoverClose>
                  <Button size={cancelSize} variant="outline">
                    {cancelText}
                  </Button>
                </PopoverClose>
                <PopoverClose>
                  <Button
                    size={saveSize}
                    onClick={() => setDateRangeChange(dateKeeper as DateRange)}
                  >
                    {saveText}
                  </Button>
                </PopoverClose>
              </div>
            ) : null}
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
