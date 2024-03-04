import React from "react"
import { cn } from "@/utils/tailwind"
import { DateRangePicker, DateRangePickerProps } from "../../date-range-picker"
import { useDataTableBase } from "../use-data-table-base"

export interface DataTableDateRangeFilterProps extends DateRangePickerProps {
  column: string
}

export const DataTableDateRangeFilter = ({
  className,
  column: columnName,
  ...props
}: DataTableDateRangeFilterProps) => {
  const { table } = useDataTableBase()

  const column = table.getColumn(columnName)

  return (
    <DateRangePicker
      {...props}
      inputClassName="border-dashed"
      className={cn(className)}
      onChange={({ from, to }) => column?.setFilterValue([from, to])}
    />
  )
}
