import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const ToolbarLoading = () => (
  <div className="flex items-center justify-center gap-4">
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
    <Skeleton className="h-9 w-9" />
  </div>
)

export default ToolbarLoading
