import { ComponentProps, Fragment, lazy, memo, useMemo } from "react"
import { cn } from "../../../libs/utils/tailwind"

export interface IconsProps extends ComponentProps<"svg"> {
  name: IconName
}

const Icons = ({ name, className, ...props }: IconsProps) => {
  const Icon = useMemo(
    () => (name ? lazy(() => import(`./${name?.replace(/\./g, "/")}.svg`)) : Fragment),
    [name],
  ) as any

  return <Icon aria-hidden="true" {...props} className={cn("h-5 w-5", className)} />
}

export default memo(Icons)
