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
        },
      },
    })

  return __queryClientInstance
}

// export const getQueryClient = cache(() => getQueryClientInstance())
export const getQueryClient = getQueryClientInstance()