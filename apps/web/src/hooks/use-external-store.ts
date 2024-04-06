"use client"

import { useCallback, useSyncExternalStore } from "react"

export const createExternalStore = <TState>(initialState: TState) => {
  let state: TState = initialState
  const listeners = new Set<any>([])

  const subscribe = <L = any>(listener: L) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  const getState = (): TState => state

  const setState = (fn: (curState: TState) => TState) => {
    state = fn(state)

    listeners.forEach((listener) => listener?.())
  }

  return {
    setState,
    getState,
    subscribe,
  }
}

export const useExternalStore = <TState, TResult>(
  store: ReturnType<typeof createExternalStore<TState>>,
  selector: (state: TState) => TResult,
) => {
  const _selector = useCallback(() => selector(store.getState()), [])
  return useSyncExternalStore(store.subscribe, _selector, _selector)
}
