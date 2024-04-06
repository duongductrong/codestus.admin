import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios"
import { getCookie } from "cookies-next"
import qs from "query-string"
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

export { fetcher }
