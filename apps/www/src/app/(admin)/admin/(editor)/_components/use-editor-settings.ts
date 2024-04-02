import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface EditorSettingsState {
  title: string
  openSettings: boolean
  isEditorDirty: boolean

  setOpenSettings: (isOpen: boolean) => void
  setTitle: (title: string) => void
  setEditorDirty: (isDirty: boolean) => void
}

export const useEditorSettings = create<EditorSettingsState>()(
  devtools((set) => ({
    title: "",
    openSettings: false,
    isEditorDirty: false,

    setOpenSettings: (isOpen) => {
      set((state) => ({
        ...state,
        openSettings: isOpen,
      }))
    },

    setTitle: (title) => {
      set((state) => ({
        ...state,
        title,
      }))
    },

    setEditorDirty: (isDirty) => {
      set((state) => ({
        ...state,
        isEditorDirty: isDirty,
      }))
    },
  })),
)
