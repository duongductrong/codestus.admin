"use client"

import { PaginationState, Table } from "@tanstack/react-table"
import { Dispatch, ReactNode, createContext, useMemo } from "react"

export interface DataTableBaseContextState {
  pagination: { page: number; pageSize: number; totalRecords: number; totalPages: number }
  setPagination: Dispatch<PaginationState>
  table: Table<any>
}

export interface DataTableBaseProviderProps extends DataTableBaseContextState {
  children: ReactNode
}

export const DataTableBaseContext = createContext<DataTableBaseContextState>(
  {} as DataTableBaseContextState,
)

export const DataTableBaseProvider = ({
  children,
  table,
  pagination,
  setPagination,
}: DataTableBaseProviderProps) => {
  const values = useMemo<DataTableBaseContextState>(
    () => ({ table, pagination, setPagination }),
    [pagination, table, setPagination],
  )

  return <DataTableBaseContext.Provider value={values}>{children}</DataTableBaseContext.Provider>
}
