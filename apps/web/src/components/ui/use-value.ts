import { dequal } from "dequal"
import { Dispatch, SetStateAction, useEffect } from "react"
import { useDeepCompareMemoize } from "@/hooks/use-deep-compare-memoize"

export const useOnchange = <TValue>(value: TValue, onChange?: (value: TValue) => any) => {
  useEffect(() => {
    onChange?.(value)
  }, [value])
}

export const useDefaultValue = <TValue>(
  defaultValue: TValue,
  state: TValue,
  setState: Dispatch<SetStateAction<TValue>>,
) => {
  useEffect(
    () => {
      if (!dequal(state, defaultValue)) {
        setState(defaultValue)
      }
    },
    useDeepCompareMemoize([defaultValue, state]),
  )
}
