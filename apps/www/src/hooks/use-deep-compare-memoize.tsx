import { dequal } from "dequal"
import { DependencyList, useMemo, useRef } from "react"

export function useDeepCompareMemoize(dependencies: DependencyList) {
  const dependenciesRef = useRef<DependencyList>(dependencies)
  const signalRef = useRef<number>(0)

  if (!dequal(dependencies, dependenciesRef.current)) {
    dependenciesRef.current = dependencies
    signalRef.current += 1
  }

  return useMemo(() => dependenciesRef.current, [signalRef.current])
}
