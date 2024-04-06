import { usePathname, useSearchParams , useRouter } from "next/navigation"
import qs from "querystring"
import { useEffect, useState } from "react"

export interface ManualPaginationState {
  page: number
  pageSize: number
}

export interface ManualPaginationOptions {
  enableUrlSearchParamsSync?: boolean
}

export const useOffsetPagination = (
  defaultStates?: Partial<ManualPaginationState>,
  opts?: ManualPaginationOptions
) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [page, setPage] = useState<number>(defaultStates?.page || 0)
  const [pageSize, setPageSize] = useState<number>(defaultStates?.pageSize || 0)

  useEffect(() => {
    if (opts?.enableUrlSearchParamsSync) {
      const currentSearchParams = qs.parse(searchParams.toString() || "")
      const stringifyNewSearchParams = qs.stringify({ ...currentSearchParams, page, pageSize })
      const newPathWithSearchParams = `${pathname}?${stringifyNewSearchParams}`

      router.push(newPathWithSearchParams)
    }
  }, [page, pageSize, opts?.enableUrlSearchParamsSync])

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
  }
}
