/* eslint-disable no-return-assign */

"use client"

import { ChevronLeftIcon, Component1Icon } from "@radix-ui/react-icons"
import { useCallback, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useElementSize } from "@/hooks/use-element-size"
import { eventDispatcher } from "@/hooks/use-event/core"
import { cn } from "@/libs/utils/tailwind"
import { GM_EVENT_TYPE } from "./constant"
import { useGeneralModal } from "./hooks/use-general-modal"
import { GENERAL_MODAL_LOADER, GeneralModalLoaderKeys } from "./loaders"
import { generalModalVariants } from "./styles"
import { GeneralForwardRef } from "./types"
import { makeSubmission } from "./utils"

export interface GeneralModalerProps {}

const GeneralModaler = (props: GeneralModalerProps) => {
  const outerRefs = useRef<GeneralForwardRef[]>([])

  const { loaders, loadings, details, configs, setLoading, closeCurrentModal, closes } =
    useGeneralModal()

  const [dialogBodyViewportRef, { width, height }] = useElementSize()

  const dimensions = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  )

  const handleSetLoading = useCallback(
    (index: number, loading: boolean) => setLoading(index, loading),
    [],
  )

  const handleSubmit =
    (fromLoader: keyof GeneralModalLoaderKeys, index: number, primaryKey?: string) =>
    (data: unknown) => {
      const modaler = details[index]

      if (modaler?.onSubmit) {
        return modaler?.onSubmit?.(data, makeSubmission).then((result) => {
          if (typeof result === "boolean" && result) {
            if (modaler.autoCloseOnSuccess || modaler.autoCloseOnError) closeCurrentModal()
          }

          return result
        })
      }

      return true
    }

  const handleSuccess =
    (fromLoader: keyof GeneralModalLoaderKeys, index: number, primaryKey?: string) =>
    (data: unknown) => {
      const modaler = details[index]

      eventDispatcher(GM_EVENT_TYPE.DISPATCHER(fromLoader, "success", primaryKey), data)

      return modaler?.onSuccess?.(data, { closeCurrentModal, closes, setLoading })
    }

  const handleError =
    (fromLoader: keyof GeneralModalLoaderKeys, index: number, primaryKey?: string) =>
    (data: unknown) => {
      const modaler = details[index]

      modaler?.onError?.(data, { closeCurrentModal, closes, setLoading })

      eventDispatcher(GM_EVENT_TYPE.DISPATCHER(fromLoader, "error", primaryKey), data)
    }

  const handleCancel = (fromLoader: keyof GeneralModalLoaderKeys, index: number) => {
    const modaler = details[index]

    modaler?.onCancel?.()

    closeCurrentModal()
  }

  return loaders?.map((loader, index) => {
    const DialogBody = GENERAL_MODAL_LOADER[loader]

    const detail = details[index]
    const actions = detail?.actions || [
      { text: "Cancel", type: "cancel", props: { variant: "outline" } },
      { text: "Save", type: "submit" },
    ]
    const isLoading = loadings[index]
    const config = configs[index] || {}
    const hideBackArrow = detail?.generalProps?.hideBackArrow

    const onSubmit = handleSubmit(loader, index, detail.primaryKey)
    const onSuccess = handleSuccess(loader, index, detail.primaryKey)
    const onError = handleError(loader, index, detail.primaryKey)

    const { defaultValues } = detail

    return (
      <Dialog
        key={loader}
        open={!!loader}
        onOpenChange={(isOpen) => (!isOpen ? closeCurrentModal() : null)}
      >
        <DialogContent className={generalModalVariants({ type: detail.type, size: detail?.size })}>
          <DialogHeader className="flex flex-row flex-wrap items-center justify-start">
            {index !== 0 && !hideBackArrow ? (
              <ChevronLeftIcon
                role="button"
                className="text-neutral-grey-300 mr-2 h-6 w-6 cursor-pointer"
                onClick={() => closeCurrentModal()}
              />
            ) : null}
            <DialogTitle>{detail?.title}</DialogTitle>
            {detail?.description ? (
              <DialogDescription className="w-full">{detail?.description}</DialogDescription>
            ) : null}
          </DialogHeader>
          <ScrollArea
            ref={dialogBodyViewportRef}
            className="relative max-h-[70vh]"
            viewportClassName="p-1 [&>*]:!block"
          >
            <DialogBody
              index={index}
              loading={isLoading}
              dimensions={dimensions}
              shouldDisabled={isLoading}
              defaultValues={defaultValues || {}}
              configs={config}
              ref={(innerEl) => {
                if (innerEl) {
                  outerRefs.current[index] = innerEl as GeneralForwardRef
                }
              }}
              closeCurrentModal={closeCurrentModal}
              setLoading={handleSetLoading}
              onSubmit={onSubmit}
              onSuccess={onSuccess}
              onError={onError}
            />
            {isLoading ? <LoadingOverlay /> : null}
          </ScrollArea>
          {actions.length ? (
            <DialogFooter className="mt-auto flex gap-1 px-1">
              {actions.map((modalAction) => {
                switch (modalAction.type) {
                  case "submit":
                    return (
                      <Button
                        {...modalAction.props}
                        key={modalAction.type}
                        disabled={isLoading}
                        // loading={isLoading}
                        onClick={() => outerRefs.current[index].submit()}
                      >
                        {modalAction.text ?? "Save"}
                      </Button>
                    )
                  case "cancel":
                    return (
                      <Button
                        {...modalAction.props}
                        key={modalAction.type}
                        disabled={isLoading}
                        onClick={() => handleCancel(loader, index)}
                      >
                        {modalAction.text ?? "Cancel"}
                      </Button>
                    )
                  default:
                    return null
                }
              })}
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    )
  })
}

export const LoadingOverlay = () => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center",
      "bg-neutral-white/80 absolute left-0 top-0",
    )}
  >
    <Component1Icon className="h-6 w-6 animate-spin" />
  </div>
)

export default GeneralModaler
