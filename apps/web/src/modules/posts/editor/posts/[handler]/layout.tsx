"use client"

import { ReactNode } from "react"
import CustomPageSection from "@/components/customs/custom-page-section"
import { cn } from "@/libs/utils/tailwind"
import { LayoutProps, ParamsProps } from "@/types/utilities"
import { useEditorSettings } from "../../use-editor-settings"

export interface PostHandlerLayoutProps
  extends LayoutProps<"creator" | "settings">,
    ParamsProps<"handler"> {}

const PostHandlerLayout = ({ creator, settings, children, params }: PostHandlerLayoutProps) => (
  <div className="flex gap-4">
    <PageSection>{params.handler === "create" ? creator : children}</PageSection>
    {settings}
  </div>
)

export const PageSection = ({ children }: { children: ReactNode }) => {
  const { openSettings } = useEditorSettings()
  return (
    <CustomPageSection
      variant="central"
      className={cn(openSettings ? "mr-[var(--el-settings-width)]" : null)}
    >
      {children}
    </CustomPageSection>
  )
}

export default PostHandlerLayout
