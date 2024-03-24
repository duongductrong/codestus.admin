import { cn } from "../../libs/utils/tailwind"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format as _format } from "date-fns/format"
import { forwardRef, useImperativeHandle, useState } from "react"
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
}

export const DatePicker = forwardRef<DatePickerExposeRef, DatePickerProps>(
  ({ placeholder = "Select a date", format = "PPP", initialFocus = true }, ref) => {
    const [date, setDate] = useState<Date>()

    useImperativeHandle(ref, () => ({}))

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? _format(date, format) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus={initialFocus} />
        </PopoverContent>
      </Popover>
    )
  },
)
