import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { GeneralModalReturnResult } from "./hooks/use-general-modal"

export const catchFieldErrors = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  result: GeneralModalReturnResult | void,
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>,
) => {
  if (typeof result === "object" && typeof result !== "function") {
    result.errors?.forEach((error) => {
      methods.setError(error.field as Path<TFieldValues>, {
        message: error.message,
      })
    })

    return !!result.errors?.length
  }

  return false
}

export const makeSubmission = <TPromiseReturn, TTakeErrorsFn extends Function>(
  promise: Promise<TPromiseReturn>,
  takeErrorsFn: TTakeErrorsFn,
) =>
  promise
    .then(() => true)
    .catch((error) => {
      const errors = takeErrorsFn?.(error)

      const errorMessages = Object.entries(errors ?? {}).map(([errorKey, errorMsg]) => ({
        field: errorKey as string,
        message: errorMsg as string,
      }))

      return {
        errors: errorMessages,
      }
    })
