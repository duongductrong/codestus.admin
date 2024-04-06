import { SortingState } from "@tanstack/react-table"
import { useState } from "react"

export const useDataTableSorting = () => {
  const [sorting, setSorting] = useState<SortingState>()

  return {
    firstSorting: sorting?.[0],
    sorting,
    setSorting,
  }
}
