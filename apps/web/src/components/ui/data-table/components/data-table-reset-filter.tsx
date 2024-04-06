"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "../../button"
import { useDataTableBase } from "../use-data-table-base"

export interface DataTableResetFilterProps {
  label?: string
}

export const DataTableResetFilter = ({ label = "Reset" }: DataTableResetFilterProps) => {
  const { table } = useDataTableBase()

  if (!table.getState().columnFilters.length) return null

  return (
    <Button className="h-9 px-2 lg:px-3" variant="ghost" onClick={() => table.resetColumnFilters()}>
      {label}
      <Cross2Icon className="ml-2 h-4 w-4" />
    </Button>
  )
}
