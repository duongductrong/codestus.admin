import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios"
import { getCookie, setCookie } from "cookies-next"
import qs from "query-string"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { toDate } from "date-fns/toDate"
import { add } from "date-fns/add"
import { tokenKeys } from "@/components/ui/use-manage-tokens"
import { flattenObject } from "../utils/object"

export interface FetcherResponse<TData = any, TConfig = any>
  extends AxiosResponse<TData, TConfig> {}

export interface FetcherError<TData = any, TConfig = any>
  extends AxiosError<FetcherResult<TData>, TConfig> {}

export interface FetcherResult<T = unknown> {
  data: T
  message: string
  // code: string
  meta?: FetcherMeta
}

export interface FetcherPaginatedVariables {
  limit?: number
  offset?: number
  page?: number
  orderBy?: {
    field: string
    value: "asc" | "desc" | "ASC" | "DESC"
  }
}

export interface FetcherBadRequest extends Record<string, string | string[]> {}

export interface FetcherMeta {
  page: number
  size: number
  total: number
}

export type FetcherValidationError = Record<string, string>

interface AxiosHeaders extends AxiosRequestHeaders {
  [key: string]: any
}

const fetcher = Axios.create({
  baseURL: "http://localhost:8000/api/v1",
  paramsSerializer: (params) => qs.stringify(flattenObject(params) || {}),
})

fetcher.interceptors.request.use((config): any => {
  const token = getCookie(tokenKeys.authToken)
  const newHeaders = {
    Authorization: `Bearer ${token}`,
    ...config.headers,
  } as AxiosHeaders

  config = {
    ...config,
    headers: newHeaders,
  }

  return config
})

fetcher.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

createAuthRefreshInterceptor(fetcher, (failedRequest: any) =>
  // 1. First try request fails - refresh the token.
  fetcher.post("/auth/refresh").then((resp) => {
    // 1a. Clear old helper cookie used in 'authorize.ts' higher order function.
    if (fetcher.defaults.headers.setCookie) {
      delete fetcher.defaults.headers.setCookie
    }

    const { token, expiredAt } = resp.data.data
    // 2. Set up new access token
    const bearer = `Bearer ${token}`
    fetcher.defaults.headers.Authorization = bearer
    // 3. Set up new access token as cookie
    setCookie(tokenKeys.authToken, token, {
      expires: add(toDate(expiredAt as Date), { months: 1 }),
    })

    // 4. Set up access token of the failed request.
    failedRequest.response.config.headers.Authorization = bearer

    // 5. Retry the request with new setup!
    return Promise.resolve()
  }),
)

export { fetcher }
