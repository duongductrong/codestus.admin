import { CSSProperties } from "react"
import { LayoutProps } from "@/types/utilities"
import EditorProvider from "./_components/editor-provider"
import PostManagerProvider from "./_components/post-manager-provider"

export interface EditorLayoutProps extends LayoutProps<"sidebar" | "header" | "toolbar"> {}

export default function EditorLayout({ sidebar, header, toolbar, children }: EditorLayoutProps) {
  return (
    <PostManagerProvider>
      <EditorProvider>
        <div
          style={{ "--el-header-height": "60px", "--el-toolbar-height": "50px" } as CSSProperties}
          className="relative min-h-screen w-full  bg-muted/40"
        >
          {header}
          {toolbar}
          {sidebar}
          <div className="flex flex-col sm:gap-4 sm:pb-4 sm:pl-14">
            <main className="mt-8 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {children}
            </main>
          </div>
        </div>
      </EditorProvider>
    </PostManagerProvider>
  )
}
