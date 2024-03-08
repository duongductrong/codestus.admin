/* eslint-disable no-console */
import { ButtonProps } from "@/components/ui/button"
import omit from "lodash/omit"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { GeneralModalLoaderType } from "../loaders"
import { GeneralModalVariant } from "../styles"

export type GeneralModalDetailSizeType = GeneralModalVariant["size"]
export type GeneralModalDetailActionType = {
  type: "cancel" | "submit"
  text: string
  props?: ButtonProps
}
export type GeneralModalDetailProps = {
  hideBackArrow?: boolean
}

export interface GeneralModalDetailsType<TDefaultValues = any> {
  primaryKey?: string
  title: string
  description?: string
  size?: GeneralModalDetailSizeType
  actions?: GeneralModalDetailActionType[]
  generalProps?: GeneralModalDetailProps
  defaultValues?: Partial<TDefaultValues>
}

export type GeneralModalConfigsType<TConfig = Record<string, unknown>> = TConfig

export interface GeneralModalType {
  loaders: (keyof GeneralModalLoaderType)[]
  details: Record<number, GeneralModalDetailsType>
  configs: Record<number, GeneralModalConfigsType>
  loadings: Record<number, boolean>

  open: <TDefaultValues = any>(
    loader: keyof GeneralModalLoaderType,
    details: GeneralModalDetailsType<TDefaultValues>,
    configs?: GeneralModalConfigsType,
  ) => void
  closeCurrentModal: () => void
  closes: () => void

  setLoading: (index: number, isLoading: boolean) => void

  setConfigs: (index: number, configs: GeneralModalConfigsType) => void
}

export const useGeneralModal = create<GeneralModalType>()(
  devtools((set, get) => ({
    loaders: [],
    details: {},
    configs: {},
    responses: [],
    loadings: {},

    open: (loader, details, configs = {}) => {
      const { loaders, details: loaderDetails, configs: loaderConfigs } = get()
      const nextIndex = loaders.length

      const newLoaders = (loaders ?? [])?.concat([loader])
      const newDetails = { ...loaderDetails, [nextIndex]: details }
      const newConfigs = { ...loaderConfigs, [nextIndex]: configs }

      // console.log("[Debug] open", loader)
      // console.log("[Debug] details", details)
      // console.log("[Debug] loaders", loaders)
      // console.log("[Debug] newLoaders", newLoaders)
      // console.log("[Debug] newLoaders", newDetails)
      return set((state) => ({
        ...state,
        loaders: newLoaders,
        details: newDetails,
        configs: newConfigs,
      }))
    },
    closeCurrentModal: () => {
      const { loaders, loadings, details } = get()

      const lastIndex = (Number(loaders.length) ?? 0) - 1
      const newLoaders = loaders?.slice(0, lastIndex)
      const newLoadings = omit(loadings, [lastIndex]) as Record<string | number, boolean>
      const newDetails = omit(details, [lastIndex])

      // console.log("[Debug] loaders", loaders)
      // console.log("[Debug] newLoaders", newLoaders)
      // console.log("[Debug] newLoadings", newLoadings)
      // console.log("[Debug] closeCurrentModal")
      return set((state) => ({
        ...state,
        loaders: newLoaders,
        loadings: newLoadings,
        details: newDetails,
      }))
    },

    closes: () => set((state) => ({ ...state, loaders: [], loadings: {}, details: {} })),

    setLoading: (index, isLoading) =>
      set((state) => {
        const previousLoadings = get().loadings

        return { ...state, loadings: { ...previousLoadings, [index]: isLoading } }
      }),

    setConfigs: (index, configs) =>
      set((state) => ({
        ...state,
        configs: {
          ...get().configs,
          [index]: configs,
        },
      })),
  })),
)
