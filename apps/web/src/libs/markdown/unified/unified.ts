import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
// import RehypeVideo from "rehype-video"
import rehypeRemark from "rehype-remark"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { unified } from "unified"
// import rehypeHighlight from "rehype-highlight"
import rehypeParse from "rehype-parse"
import remarkStringify from "remark-stringify"

export const processMarkdown = (content: string | null | undefined) => {
  if (!content) return ""

  return (
    unified()
      .use(remarkToc)
      .use(remarkGfm)
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      // .use(rehypeHighlight)
      // .use(RehypeVideo, { details: false })
      .use(rehypeStringify)
      .process(content || "")
  )
}

export const convertedMarkdownToHTML = async (data: string) => String(await processMarkdown(data))

export const processHtml = (content: string | null | undefined) => {
  if (!content) return ""

  return unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(content || "")
}

export const convertedHTMLToMarkdown = async (content: string) => String(await processHtml(content))
