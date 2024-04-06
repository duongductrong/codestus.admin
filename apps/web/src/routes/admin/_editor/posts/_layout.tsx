import CustomPageSection from "@/components/customs/custom-page-section"
import { cn } from "@/libs/utils/tailwind"
import EditorSettings from "@/modules/posts/editor/editor-settings"
import { useEditorSettings } from "@/modules/posts/editor/use-editor-settings"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { ReactNode, Suspense } from "react"

export const Route = createFileRoute("/admin/_editor/posts/_layout")({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="flex gap-4">
      <PageSection>
        <Outlet />
      </PageSection>
      <Suspense>
        <EditorSettings />
      </Suspense>
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
