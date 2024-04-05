import { LayoutProps } from "@/types/utilities"

export interface PostsLayoutProps extends LayoutProps<"table" | "statistics"> {}

const PostsLayout = ({ table, statistics, children }: PostsLayoutProps) => (
  <>
    {statistics}
    {table}
  </>
)

export default PostsLayout
