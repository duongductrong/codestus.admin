"use client"

import debounce from "lodash/debounce"
import { useState } from "react"
import { useEvent, useIsomorphicLayoutEffect } from "react-use"

export type UseWindowDimensionsVariables = {
  debounceMs?: number
  width?: number
  height?: number
}

export default function useWindowDimensions(
  variables: UseWindowDimensionsVariables = { debounceMs: 0, width: 0, height: 0 },
) {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  const [windowSize, setWindowSize] = useState({ width: variables.width || 0, height: variables.height || 0 })

  const handleResize = () => {
    setWindowSize(getSize())
  }

  const handleResizeDebounced = debounce(handleResize, variables.debounceMs)

  useIsomorphicLayoutEffect(() => {
    setWindowSize(getSize())

    window.addEventListener("resize", handleResizeDebounced)
    return () => window.removeEventListener("resize", handleResizeDebounced)
  }, [])

  return windowSize
}
