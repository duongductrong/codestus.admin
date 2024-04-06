import { RowSelectionState } from "@tanstack/react-table"
import { useState } from "react"

export const useDataTableRowsSelection = () => {
  const [rowsSelection, setRowsSelection] = useState<RowSelectionState>()

  return {
    rowsSelection,
    setRowsSelection,
  }
}
