import { useState } from "react"

export interface UsePaginationVariables {
  pageSize?: number
  pageIndex?: number
}

export const usePagination = (variables?: UsePaginationVariables) => {
  const [pageIndex, setPageIndex] = useState<number>(Number(variables?.pageIndex || 0))
  const [pageSize, setPageSize] = useState<number>(Number(variables?.pageSize || 0))

  return {
    pageIndex: Number(pageIndex),
    pageSize: Number(pageSize),
    setPageIndex,
    setPageSize,
  }
}
