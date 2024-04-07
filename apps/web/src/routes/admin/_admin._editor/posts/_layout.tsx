import { Outlet, createFileRoute } from "@tanstack/react-router"
import { ReactNode } from "react"
import CustomPageSection from "@/components/customs/custom-page-section"
import { cn } from "@/libs/utils/tailwind"
import EditorSettings from "@/modules/posts/editor/editor-settings"
import { useEditorSettings } from "@/modules/posts/editor/use-editor-settings"

export const Route = createFileRoute("/admin/_admin/_editor/posts/_layout")({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="flex gap-4">
      <PageSection>
        <Outlet />
      </PageSection>
      <EditorSettings />
    </div>
  )
}

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
