import { ForwardedRef } from "react"
import {
  GeneralModalConfigsState,
  GeneralModalDetailsState,
  GeneralModalReturnResult,
} from "./hooks/use-general-modal"

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
  configs?: GeneralModalConfigsState<TConfigValues>
  dimensions?: {
    width: number
    height: number
  }
  closeCurrentModal: () => void
  onSubmit: (data: any) => Promise<GeneralModalReturnResult> | boolean
  onSuccess: (data: any) => void
  onError: (data: unknown) => void
}

export interface GeneralForwardRef {
  submit: () => void
  reset: () => void
}
