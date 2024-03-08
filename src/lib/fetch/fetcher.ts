import { flattenObject } from "@/utils/object"
import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios"
import qs from "querystring"

export interface FetcherResponse<TData = any, TConfig = any>
  extends AxiosResponse<TData, TConfig> {}

export interface FetcherError<TData = any, TConfig = any>
  extends AxiosError<FetcherResult<TData>, TConfig> {}

export interface FetcherResult<T = unknown> {
  data: T
  message: string
  code: string
  pagination?: FetcherPagination
}

export interface FetcherBadRequest extends Record<string, string | string[]> {}

export interface FetcherPagination {
  page: number
  size: number
  total: number
}

interface AxiosHeaders extends AxiosRequestHeaders {
  [key: string]: any
}

const fetcher = Axios.create({
  baseURL: process.env.ENDPOINT,
  paramsSerializer: (params) => qs.stringify(flattenObject(params) || {}),
})

fetcher.interceptors.request.use((config): any => {
  const token = "your_token"
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
