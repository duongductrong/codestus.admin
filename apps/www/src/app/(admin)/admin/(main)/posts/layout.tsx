/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from "react"
import CustomPageSection from "@/components/customs/custom-page-section"
import { LayoutProps } from "@/types/utilities"

export interface PostsLayoutProps extends LayoutProps<"table" | "statistics"> {}

const PostsLayout = ({ table, statistics, children }: PostsLayoutProps) => (
    <>
      {statistics}
      {table}
    </>
  )

export default PostsLayout
