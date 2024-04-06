import { useState } from "react"

export interface UseDataTablePaginationVariables {
  pageSize?: number
  pageIndex?: number
}

export const useDataTablePagination = (variables?: UseDataTablePaginationVariables) => {
  const [pageIndex, setPageIndex] = useState<number>(Number(variables?.pageIndex || 0))
  const [pageSize, setPageSize] = useState<number>(Number(variables?.pageSize || 0))

  return {
    pageIndex: Number(pageIndex),
    pageSize: Number(pageSize),
    setPageIndex,
    setPageSize,
  }
}
