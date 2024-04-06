import { DependencyList, useEffect } from "react"
import { eventDispatcher, eventListener, eventRemover } from "./core"

/**
 * Hook create a global event
 * @param {string} event The KEY event
 * @returns
 */
function useEvent<T extends string, D = any>(event: T) {
  /**
   * Dispatcher data event global
   * @param {any} data
   */
  const dispatch = (data: D) => {
    eventDispatcher<D>(event, data)
  }

  /**
   * The listener a event pushing by dispatch
   * @param {void} callback
   */
  const listener = <F extends (event: CustomEvent | Event) => void>(callback: F) => {
    eventListener<F>(event, callback)
  }

  /**
   * Destroy a event listening
   * @param {void} callback
   */
  const remove = <F extends (event: CustomEvent | Event) => void>(callback: F) => {
    eventRemover<F>(event, callback)
  }

  return { dispatch, listener, remove }
}

function useEventListener<T extends string, C extends (event: CustomEvent | Event) => void>(
  event: T,
  callback: C,
  deps: DependencyList = [],
) {
  const { listener, remove } = useEvent(event)

  useEffect(() => {
    listener(callback)

    return () => {
      remove(callback)
    }
  }, [event, ...deps])

  return null
}

export { useEvent, useEventListener }
