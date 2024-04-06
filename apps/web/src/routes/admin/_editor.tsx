import EditorHeader from "@/modules/posts/editor/editor-header"
import EditorProvider from "@/modules/posts/editor/editor-provider"
import EditorSidebar from "@/modules/posts/editor/editor-sidebar"
import EditorToolbar from "@/modules/posts/editor/editor-toolbar"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { CSSProperties } from "react"

export const Route = createFileRoute("/admin/_editor")({
  component: EditorLayout,
})

function EditorLayout() {
  return (
    <EditorProvider>
      <div
        style={
          {
            "--el-header-height": "60px",
            "--el-toolbar-height": "50px",
            "--el-settings-width": "500px",
          } as CSSProperties
        }
        className="relative min-h-screen w-full  bg-muted/40"
      >
        <EditorHeader />
        <EditorToolbar />
        <EditorSidebar />
        <div className="flex flex-col sm:gap-4 sm:pb-4 sm:pl-14">
          <main className="mt-8 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
    </EditorProvider>
  )
}
