import { Editor } from "@tiptap/react"
import { createContext, useContext } from "react"
import { create, useStore } from "zustand"
import { devtools } from "zustand/middleware"

export interface EditorContextState {
  editor: Editor | null
  setEditor: (editor: Editor) => void
}

export const createEditorStore = (defaultState: Partial<EditorContextState>) =>
  create<EditorContextState>()(
    devtools((set) => ({
      editor: defaultState.editor ?? null,

      setEditor(editor) {
        set((state) => ({ ...state, editor }))
      },
    })),
  )

export const EditorContext = createContext({})

export const useEditorContext = <TSelector>(
  selector?: (state: EditorContextState) => TSelector,
) => {
  const store = useContext(EditorContext)
  if (!store) throw new Error("Missing `EditorProvider`")

  return useStore<ReturnType<typeof createEditorStore>, TSelector>(
    store as any,
    selector || (((state: any) => state) as any),
  )
}

export const useCurrentEditorContext = () => useEditorContext((state) => state.editor)

// export const useCurrentEditorContext = () => useCurrentEditor().editor
