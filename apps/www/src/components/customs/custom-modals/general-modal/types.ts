import { ForwardedRef } from "react"
import { GeneralModalConfigsType } from "./hooks/use-general-modal"

export interface GeneralModalComponentProps<
  TDefaultValues = any,
  TConfigValues = Record<string, unknown>,
> {
  index: number
  loading?: boolean
  shouldDisabled?: boolean
  setLoading: (index: number, isLoading: boolean) => void
  outerRef?: ForwardedRef<GeneralForwardRef>
  defaultValues?: TDefaultValues
  configs?: GeneralModalConfigsType<TConfigValues>
  dimensions?: {
    width: number
    height: number
  }
  closeCurrentModal: () => void
  onSuccess: <T>(data: T) => void
  onError: <T>(data: T) => void
}

export interface GeneralForwardRef {
  submit: () => void
  reset: () => void
}
