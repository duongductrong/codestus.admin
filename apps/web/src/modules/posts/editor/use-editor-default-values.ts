import { useEffect } from "react"
import { useDeepCompareMemoize } from "@/components/ui/use-deep-compare-memoize"
import { useEditorEvents } from "./use-editor-events"

export const useEditorDefaultValues = <TFieldValues>(
  defaultValues: Partial<TFieldValues> | undefined,
) => {
  const { settingSetterEvent } = useEditorEvents()

  useEffect(
    () => {
      if (defaultValues) {
        setTimeout(() => {
          settingSetterEvent(defaultValues)
        })
      }
    },
    useDeepCompareMemoize([defaultValues]),
  )
}
