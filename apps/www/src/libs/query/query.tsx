"use client"

/**
 * Read docs:
 * - https://tanstack.com/query/v5/docs/react/guides
 * - https://tanstack.com/query/v5/docs/react/guides
 */

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { ReactNode, useState } from "react"
import { getQueryClientInstance } from "."

export interface QueryProviderProps {
  children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(() => getQueryClientInstance())

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
