import { cn } from "@/utils/tailwind"
import Image from "next/image"
import React, { ComponentProps, ElementRef, forwardRef } from "react"

export interface SidebarLogoProps
  extends Omit<ComponentProps<typeof Image>, "src" | "width" | "height" | "alt"> {}

const SidebarLogo = forwardRef<ElementRef<typeof Image>, SidebarLogoProps>(
  ({ className, ...props }, ref) => (
    <Image
      {...props}
      ref={ref}
      src="https://preview.keenthemes.com/metronic8/demo56/assets/media/logos/demo-56.svg"
      className={cn("h-[35px] w-[35px]", className)}
      width={35}
      height={35}
      alt="123"
      priority
    />
  ),
)

export default SidebarLogo
