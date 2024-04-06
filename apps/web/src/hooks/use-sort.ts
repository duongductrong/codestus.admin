import { useState } from "react"

export interface UseSortState<F extends string> {
  field: F
  value: "asc" | "desc" | "ASC" | "DESC"
}

export interface UseSortVariables<F extends string = string> extends UseSortState<F> {}

export const useSort = <F extends string = string>(variables: UseSortVariables<F>) => {
  const [sort, setSort] = useState<UseSortState<F>>({ field: variables.field, value: variables.value })

  return {
    sort,
    setSort,
  }
}
