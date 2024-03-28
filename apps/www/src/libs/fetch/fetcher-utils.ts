import { AxiosError } from "axios"
import { FetcherError, FetcherResult, FetcherValidationError } from "./fetcher"

export const takeValidationErrors = (e: any): FetcherValidationError | undefined => {
  const error = e as AxiosError<FetcherResult<FetcherValidationError>>

  const validationErrors = error.response?.data.data

  return validationErrors
}

export const takeErrorMessage = (e: any): string => {
  const error = e as AxiosError<FetcherError<FetcherValidationError>>

  return error.response?.data.message ?? "Unknown errors"
}
