import { useEventListener } from "@/hooks/use-event"
import { useGeneralModal } from "."
import { GM_EVENT_TYPE } from "../constant"
import { GeneralModalLoaderKeys } from "../loaders"

export type UseModalReceiverLoader = keyof GeneralModalLoaderKeys
export type UseModalReceiverVariables<TSuccessData, TErrorData> = {
  primaryKey?: string

  onSuccess?: (data: TSuccessData) => void
  onError?: (data: TErrorData) => void

  autoCloseOnError?: boolean
  autoCloseOnSuccess?: boolean
}

export const useModalReceiver = <TSuccessData = unknown, TErrorData = unknown>(
  loader: keyof GeneralModalLoaderKeys,
  {
    primaryKey,
    autoCloseOnError,
    autoCloseOnSuccess,
    onError,
    onSuccess,
  }: UseModalReceiverVariables<TSuccessData, TErrorData>,
  deps: any[] = [],
) => {
  const { closeCurrentModal } = useGeneralModal()

  useEventListener(
    GM_EVENT_TYPE.RECEIVER_ERROR(loader, primaryKey),
    (event) => {
      if (event instanceof CustomEvent && onError) {
        onError(event.detail)

        if (autoCloseOnError) {
          closeCurrentModal()
        }
      }
    },
    deps,
  )

  useEventListener(
    GM_EVENT_TYPE.RECEIVER_SUCCESS(loader, primaryKey),
    (event) => {
      if (event instanceof CustomEvent && onSuccess) {
        onSuccess(event.detail)
        if (autoCloseOnSuccess) {
          closeCurrentModal()
        }
      }
    },
    deps,
  )
}
