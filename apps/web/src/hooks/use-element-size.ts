import { useCallback, useState } from "react"

import { useEvent, useIsomorphicLayoutEffect } from "react-use"

interface Size {
  width: number
  height: number
  offsetTop: number
  offsetLeft: number
  offsetX: number
  offsetY: number
}

export function useElementSize<T extends HTMLElement>(): [
  (node: T | null) => void,
  Size,
] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
    offsetTop: 0,
    offsetLeft: 0,
    offsetX: 0,
    offsetY: 0,
  })

  // Prevent too many rendering using useCallback
  const handleParameterChanges = () => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
      offsetTop: ref?.offsetTop || 0,
      offsetLeft: ref?.offsetLeft || 0,
      offsetX: ref?.getBoundingClientRect().x || 0,
      offsetY: ref?.getBoundingClientRect().y || 0,
    })
  }

  useEvent("resize", handleParameterChanges)
  useEvent("scroll", handleParameterChanges)

  useIsomorphicLayoutEffect(() => {
    handleParameterChanges()
     
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}
