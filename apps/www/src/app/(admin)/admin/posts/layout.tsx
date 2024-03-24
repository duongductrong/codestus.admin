/* eslint-disable react/no-unescaped-entities */
import React from "react"
import CustomPageSection from "@/components/customs/custom-page-section"
import { LayoutProps } from "@/types/utilities"

export interface PostsLayoutProps extends LayoutProps {}

const PostsLayout = ({ children }: PostsLayoutProps) => (
  <CustomPageSection title="Posts" description="All posts published over there">
    {children}
  </CustomPageSection>
)

export default PostsLayout
