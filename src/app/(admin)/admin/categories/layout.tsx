/* eslint-disable react/no-unescaped-entities */
import CustomPageSection from "@/components/customs/custom-page-section"
import { LayoutProps } from "@/types/utilities"
import React from "react"

export interface PostsLayoutProps extends LayoutProps {}

const PostsLayout = ({ children }: PostsLayoutProps) => (
  <CustomPageSection
    title="Category"
    description="Your categories list help your customer take overview in your products."
  >
    {children}
  </CustomPageSection>
)

export default PostsLayout
