"use client"

import { cn } from "@/utils/tailwind"
import { DateRangePicker, DateRangePickerProps } from "../../date-range-picker"
import { useDataTableBase } from "../use-data-table-base"

export interface DataTableDateRangeFilterProps extends DateRangePickerProps {
  column: string
}

export const DataTableDateRangeFilter = ({
  className,
  column: columnName,
  inputClassName,
  ...props
}: DataTableDateRangeFilterProps) => {
  const { table } = useDataTableBase()

  const column = table.getColumn(columnName)
  const value = column?.getFilterValue() as [Date, Date]

  return (
    <DateRangePicker
      {...props}
      inputClassName={cn("border-dashed", inputClassName)}
      className={cn(className)}
      value={{ from: value?.[0], to: value?.[1] }}
      onChange={({ from, to }) => column?.setFilterValue([from, to])}
    />
  )
}
