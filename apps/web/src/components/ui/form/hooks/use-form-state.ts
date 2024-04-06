import { FieldValues, useFormContext } from "react-hook-form"

export const useFormState = <TFieldValues extends FieldValues>() =>
  useFormContext<TFieldValues>().formState
