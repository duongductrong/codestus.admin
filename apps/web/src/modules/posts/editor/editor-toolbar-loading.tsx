import { Skeleton } from "@/components/ui/skeleton"
import { toolbarEditorVariants } from "./editor-toolbar"
import { cn } from "@/libs/utils/tailwind"

const EditorToolbarLoading = () => (
  <div className={cn(toolbarEditorVariants({ direction: "horizontal" }))}>
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-36" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
  </div>
)

export default EditorToolbarLoading
