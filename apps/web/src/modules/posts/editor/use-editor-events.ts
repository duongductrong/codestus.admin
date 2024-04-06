import { DependencyList } from "react"
import { useEvent, useEventListener } from "@/hooks/use-event"

export const EDITOR_SETTING_CHANGES = "EDITOR_SETTING_CHANGES"
export const EDITOR_SETTING_SETTER = "EDITOR_SETTING_SETTER"
export const EDITOR_SUBMISSION = "EDITOR_SUBMISSION"

export const useEditorEvents = () => {
  const settingChangesEvent = useEvent(EDITOR_SETTING_CHANGES)
  const submitEvent = useEvent(EDITOR_SUBMISSION)
  const settingSetterEvent = useEvent(EDITOR_SETTING_SETTER)

  return {
    settingChangesEvent: settingChangesEvent.dispatch,
    settingSetterEvent: settingSetterEvent.dispatch,
    submitEvent: submitEvent.dispatch,
  }
}

export const useEditorSettingsChanges = <TData>(
  callback: (data: TData) => void,
  deps?: DependencyList,
) => {
  useEventListener(
    EDITOR_SETTING_CHANGES,
    (e) => {
      const event = e as CustomEvent
      callback(event.detail)
    },
    deps,
  )
}

export const useEditorSubmission = <TData>(callback: () => void, deps?: DependencyList) => {
  useEventListener(
    EDITOR_SUBMISSION,
    (e) => {
      callback()
    },
    deps,
  )
}

export const useEditorSettingSetter = <TData>(
  callback: (data: TData) => void,
  deps?: DependencyList,
) => {
  useEventListener(
    EDITOR_SETTING_SETTER,
    (e) => {
      const event = e as CustomEvent
      callback(event.detail)
    },
    deps,
  )
}
