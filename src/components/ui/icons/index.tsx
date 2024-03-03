/* eslint-disable global-require */
import { cn } from "@/utils/tailwind"
import dynamic from "next/dynamic"
import React, { ComponentProps } from "react"

export interface IconsProps extends ComponentProps<"svg"> {
  name: IconName
}

const Icons = ({ name, className, ...props }: IconsProps) => {
  const Icon = dynamic(() => import(`./${name.replace(/\./g, "/")}.svg`), { ssr: true }) as any

  return <Icon aria-hidden="true" {...props} className={cn("h-5 w-5", className)} />
}

export default Icons
