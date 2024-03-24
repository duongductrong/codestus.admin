import dynamic, { DynamicOptions, Loader } from "next/dynamic"
import { forwardRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { GeneralForwardRef, GeneralModalComponentProps } from "./types"

const loading = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-[25px] max-w-[50%]" />
    <Skeleton className="h-[40px]" />
    <Skeleton className="h-[300px]" />
  </div>
)

const takeForm = <T,>(options: DynamicOptions<T> | Loader<T>) => {
  const Component = dynamic(options, {
    ssr: true,
    loading,
  }) as any

  return forwardRef<GeneralForwardRef, GeneralModalComponentProps>((props, ref) => (
    <Component {...props} outerRef={ref} />
  ))
}

// const DynamicTemplate = dynamic(() => import("./components/template"), {
//   ssr: true,
//   loading,
// })

// const TemplateForm = forwardRef<GeneralForwardRef, GeneralModalComponentProps>((props, ref) => (
//   <DynamicTemplate {...props} outerRef={ref} />
// ))

const TagForm = takeForm(() => import("./components/tag-form"))

export const GENERAL_MODAL_LOADER = {
  TagForm,
} as const

export type GeneralModalLoaderKeys = typeof GENERAL_MODAL_LOADER
