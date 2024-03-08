"use client"

import { ReactNode } from "react"
import { useDataTableBase } from "../use-data-table-base"

export interface DataTableSelectionImpactProps {
  children: ReactNode

  hideWhenItUnselect?: boolean
}

export const DataTableSelectionImpact = ({
  children,
  hideWhenItUnselect = true,
}: DataTableSelectionImpactProps) => {
  const { table } = useDataTableBase()

  const rows = table.getState().rowSelection
  const isSomeSelected = !!Object.values(rows).length

  if (!isSomeSelected && hideWhenItUnselect) return null

  return children
}
