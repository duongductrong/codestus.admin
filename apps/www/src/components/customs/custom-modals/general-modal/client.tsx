"use client"

import { Slot } from "@radix-ui/react-slot"
import { ReactNode } from "react"
import { useEventListener } from "../../../../hooks/use-event"
import { GM_EVENT_TYPE } from "./constant"
import { GeneralModalDetailsState, useGeneralModal } from "./hooks"
import { GeneralModalConfigsState } from "./hooks/use-general-modal"
import { GeneralModalLoaderKeys } from "./loaders"

export interface GeneralModalTriggerProps {
  loader: keyof GeneralModalLoaderKeys
  details: GeneralModalDetailsState
  children: ReactNode
  configs?: GeneralModalConfigsState

  openCallback?: () => void
  onLoading?: () => void
  onSuccess?: (data: any) => void
  onError?: (data: any) => void

  autoCloseOnSuccess?: boolean
  autoCloseOnError?: boolean
}

export const GeneralModalTrigger = ({
  loader,
  details,
  configs,
  autoCloseOnSuccess = true,
  autoCloseOnError = false,
  openCallback,
  onSuccess,
  onError,
  ...props
}: GeneralModalTriggerProps) => {
  const { open, closeCurrentModal } = useGeneralModal()

  useEventListener(GM_EVENT_TYPE.RECEIVER_ERROR(loader, details.primaryKey), (event) => {
    if (event instanceof CustomEvent && onError) {
      onError(event.detail)

      if (autoCloseOnError) {
        closeCurrentModal()
      }
    }
  })

  useEventListener(GM_EVENT_TYPE.RECEIVER_SUCCESS(loader, details.primaryKey), (event) => {
    if (event instanceof CustomEvent && onSuccess) {
      onSuccess(event.detail)
      if (autoCloseOnSuccess) {
        closeCurrentModal()
      }
    }
  })

  return (
    <Slot
      {...props}
      onClick={() => {
        open(loader, { ...details }, configs)

        if (openCallback) openCallback()
      }}
    />
  )
}
