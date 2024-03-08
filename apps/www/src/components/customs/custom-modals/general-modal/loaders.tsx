import { Skeleton } from "../../../ui/skeleton"
import dynamic from "next/dynamic"
import { forwardRef } from "react"
import { GeneralForwardRef, GeneralModalComponentProps } from "./types"

const loading = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-[25px] max-w-[50%]" />
    <Skeleton className="h-[40px]" />
    <Skeleton className="h-[300px]" />
  </div>
)

const DynamicTemplate = dynamic(() => import("./components/template"), {
  ssr: true,
  loading,
})

const TemplateForm = forwardRef<GeneralForwardRef, GeneralModalComponentProps>((props, ref) => (
  <DynamicTemplate {...props} outerRef={ref} />
))

export const GENERAL_MODAL_LOADER = {
  TemplateForm,
} as const

export type GeneralModalLoaderType = typeof GENERAL_MODAL_LOADER
