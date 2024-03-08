/* eslint-disable no-return-assign */

"use client"

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
import { cn } from "@/utils/tailwind"
import { ChevronLeftIcon, Component1Icon } from "@radix-ui/react-icons"
import { useCallback, useMemo, useRef } from "react"
import { GM_EVENT_TYPE } from "./constant"
import { useGeneralModal } from "./hooks/use-general-modal"
import { GENERAL_MODAL_LOADER, GeneralModalLoaderType } from "./loaders"
import { generalModalVariants } from "./styles"
import { GeneralForwardRef } from "./types"

export interface GeneralModalerProps {}

const GeneralModaler = (props: GeneralModalerProps) => {
  const outerRefs = useRef<GeneralForwardRef[]>([])

  const { loaders, loadings, details, configs, setLoading, closeCurrentModal } = useGeneralModal()

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

  const handleSuccess =
    (fromLoader: keyof GeneralModalLoaderType, primaryKey?: string) => (data: unknown) => {
      eventDispatcher(GM_EVENT_TYPE.DISPATCHER(fromLoader, "success", primaryKey), data)
    }

  const handleError =
    (fromLoader: keyof GeneralModalLoaderType, primaryKey?: string) => (data: unknown) => {
      eventDispatcher(GM_EVENT_TYPE.DISPATCHER(fromLoader, "error", primaryKey), data)
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

    const { defaultValues } = detail

    return (
      <Dialog
        key={loader}
        open={!!loader}
        onOpenChange={(isOpen) => (!isOpen ? closeCurrentModal() : null)}
      >
        <DialogContent className={generalModalVariants({ size: detail?.size })}>
          <DialogHeader className="flex flex-row items-center flex-wrap justify-start">
            {index !== 0 && !hideBackArrow ? (
              <ChevronLeftIcon
                role="button"
                className="text-neutral-grey-300 h-6 w-6 cursor-pointer mr-2"
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
              onSuccess={handleSuccess(loader, detail.primaryKey)}
              onError={handleError(loader, detail.primaryKey)}
            />
            {isLoading ? <LoadingOverlay /> : null}
          </ScrollArea>
          {actions.length ? (
            <DialogFooter className="flex gap-4 px-1 [&>*]:flex-1">
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
                        {/* <Translator text={modalAction.text} /> */}
                      </Button>
                    )
                  case "cancel":
                    return (
                      <Button
                        {...modalAction.props}
                        key={modalAction.type}
                        // variant={modalAction.props?.variant ?? "outlined:secondary-gray"}
                        disabled={isLoading}
                        onClick={closeCurrentModal}
                      >
                        {modalAction.text ?? "Cancel"}
                        {/* <Translator text={modalAction.text} /> */}
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
