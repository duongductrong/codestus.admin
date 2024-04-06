import CustomPageSection from "@/components/customs/custom-page-section"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/admin/_main/categories/_layout")({
  component: CategoriesLayout,
})

function CategoriesLayout() {
  return (
    <CustomPageSection
      title="Category"
      description="Your categories list help your customer take overview in your products."
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </CustomPageSection>
  )
}
