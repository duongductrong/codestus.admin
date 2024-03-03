/* eslint-disable global-require */
import dynamic from "next/dynamic"
import React, { ComponentProps } from "react"

export interface IconsProps extends ComponentProps<"svg"> {
  name: IconName
}

const Icons = ({ name, ...props }: IconsProps) => {
  const Icon = dynamic(() => import(`.${name}`), { ssr: true })

  return <Icon aria-hidden="true" {...props} />
}

export default Icons
