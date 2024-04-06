import React from "react"
import CustomPageSection from "@/components/customs/custom-page-section"
import { LayoutProps } from "@/types/utilities"

export interface CategoriesLayoutProps extends LayoutProps {}

const CategoriesLayout = ({ children }: CategoriesLayoutProps) => (
  <CustomPageSection
    title="Category"
    description="Your categories list help your customer take overview in your products."
  >
    {children}
  </CustomPageSection>
)

export default CategoriesLayout
