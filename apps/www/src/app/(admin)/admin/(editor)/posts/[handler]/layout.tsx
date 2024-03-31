import React from "react"
import { LayoutProps, ParamsProps } from "@/types/utilities"
import CustomPageSection from "@/components/customs/custom-page-section"

export interface PostHandlerLayoutProps extends LayoutProps<"creator">, ParamsProps<"handler"> {}

const PostHandlerLayout = ({ creator, children, params }: PostHandlerLayoutProps) => (
  <CustomPageSection variant="central">
    {params.handler === "create" ? creator : children}
  </CustomPageSection>
)

export default PostHandlerLayout
