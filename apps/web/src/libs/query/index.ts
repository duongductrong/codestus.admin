import { QueryClient } from "@tanstack/react-query"

let __queryClientInstance: QueryClient

export const getQueryClientInstance = () => {
  if (!__queryClientInstance)
    __queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 1000,
          retry(failureCount, error) {
            return false
          },
          placeholderData: (previousData: any) => previousData,
        },
      },
    })

  return __queryClientInstance
}

export const getQueryClient = getQueryClientInstance()
