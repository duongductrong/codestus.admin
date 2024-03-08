import { cn } from "../../../utils/tailwind"
import dynamic from "next/dynamic"
import React, { ComponentProps, Fragment, memo, useMemo } from "react"

export interface IconsProps extends ComponentProps<"svg"> {
  name: IconName
}

const Icons = ({ name, className, ...props }: IconsProps) => {
  const Icon = useMemo(
    () =>
      name ? dynamic(() => import(`./${name?.replace(/\./g, "/")}.svg`), { ssr: true }) : Fragment,
    [name],
  ) as any

  return <Icon aria-hidden="true" {...props} className={cn("h-5 w-5", className)} />
}

export default memo(Icons)
