import Image from "next/image"
import React, { ComponentProps, ElementRef, forwardRef } from "react"
import { cn } from "../../../../../../libs/utils/tailwind"

export interface SidebarLogoProps
  extends Omit<ComponentProps<typeof Image>, "src" | "width" | "height" | "alt"> {}

const SidebarLogo = forwardRef<ElementRef<typeof Image>, SidebarLogoProps>(
  ({ className, ...props }, ref) => (
    <Image
      {...props}
      ref={ref}
      src="https://preview.keenthemes.com/metronic8/demo56/assets/media/logos/demo-56.svg"
      className={cn("h-[30] w-[30]", className)}
      width={30}
      height={30}
      alt="123"
      priority
    />
  ),
)

export default SidebarLogo
