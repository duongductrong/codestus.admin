"use client"

import { useSyncExternalStore } from "react"

export interface PromptState {
  title: string
  description?: string
  cancelText?: string
  confirmText?: string
  open?: boolean
}

export type PromptFunction = (confirm: boolean) => void

const initialPromptState = {
  title: "",
  description: "",
  cancelText: "Cancel",
  confirmText: "Confirm",
  open: false,
}

let promptState: PromptState = initialPromptState
let memoryListeners: any[] = []
let feedbackFn: PromptFunction | null = null

export const emitChange = () => {
  memoryListeners.forEach((listener) => {
    listener()
  })
}

export const subscribe = (listener: unknown) => () => {
  memoryListeners = [...memoryListeners, listener]

  return () => {
    memoryListeners = memoryListeners.filter((l) => l !== listener)
  }
}

export const getSnapshot = () => promptState

export const getSnapshotServer = () => promptState

export const usePrompt = () => (state: Omit<PromptState, "open">) =>
  new Promise((resolve) => {
    promptState = {
      ...initialPromptState,
      ...state,
      open: true,
    }

    emitChange()

    feedbackFn = (confirm) => {
      promptState = {
        ...initialPromptState,
        open: false,
      }

      emitChange()
      resolve(confirm)
    }
  })

export const usePromptInternalActions = () => {
  const close = () => feedbackFn?.(false)
  const ok = () => feedbackFn?.(true)

  return {
    close,
    ok,
  }
}

export const usePromptStore = () => {
  const promptStore = useSyncExternalStore(subscribe, getSnapshot, getSnapshotServer)

  return promptStore
}
