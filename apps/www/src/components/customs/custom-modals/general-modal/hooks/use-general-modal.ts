/* eslint-disable no-console */
import { isNil } from "lodash"
import omit from "lodash/omit"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { ButtonProps } from "@/components/ui/button"
import { GeneralModalLoaderKeys } from "../loaders"
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

export interface GeneralModalDetailsState<
  TDefaultValues = any,
  TSuccessValues = any,
  TErrorValues = any,
> {
  type: "modal" | "drawer"
  primaryKey?: string
  title: string
  description?: string
  size?: GeneralModalDetailSizeType
  actions?: GeneralModalDetailActionType[]
  generalProps?: GeneralModalDetailProps
  defaultValues?: Partial<TDefaultValues>
  autoCloseOnSuccess?: boolean
  autoCloseOnError?: boolean

  onSuccess?: <T = TSuccessValues>(
    data: TSuccessValues,
    modaler: Pick<GeneralModalState, "closeCurrentModal" | "closes" | "setLoading">,
  ) => void
  onError?: <T = TErrorValues>(
    data: T,
    modaler: Pick<GeneralModalState, "closeCurrentModal" | "closes" | "setLoading">,
  ) => void
  onCancel?: () => void
}

export type GeneralModalConfigsState<TConfig = Record<string, unknown>> = TConfig

export interface GeneralModalState {
  loaders: (keyof GeneralModalLoaderKeys)[]
  details: Record<number, GeneralModalDetailsState>
  configs: Record<number, GeneralModalConfigsState>
  loadings: Record<number, boolean>

  open: <TDefaultValues = any, TSuccessValues = any, TErrorValues = any>(
    loader: keyof GeneralModalLoaderKeys,
    details: GeneralModalDetailsState<TDefaultValues, TSuccessValues, TErrorValues>,
    configs?: GeneralModalConfigsState,
  ) => void

  closeCurrentModal: () => void

  closes: () => void

  setLoading: (index: number, isLoading: boolean) => void

  setConfigs: (index: number, configs: GeneralModalConfigsState) => void
}

export const useGeneralModal = create<GeneralModalState>()(
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

      const newDetails = {
        ...loaderDetails,
        [nextIndex]: {
          ...details,
          autoCloseOnSuccess: isNil(details.autoCloseOnSuccess) ? true : details.autoCloseOnSuccess,
          autoCloseOnError: isNil(details.autoCloseOnError) ? true : details.autoCloseOnError,
        } as GeneralModalDetailsState,
      }

      const newConfigs = { ...loaderConfigs, [nextIndex]: configs as GeneralModalConfigsState }

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

export const useModalOpenSelector = (state: GeneralModalState) => state.open
