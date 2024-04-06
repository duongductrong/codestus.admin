import { useEffect, useState } from "react"
import { convertedHTMLToMarkdown, convertedMarkdownToHTML } from "./unified/unified"

export const useUnifiedTransformer = (
  contentRaw: string,
  initFormat: "markdown" | "html" | "raw",
  enabled: boolean = true,
) => {
  const [loading, setLoading] = useState(enabled)
  const [content, setContent] = useState(contentRaw)

  useEffect(() => {
    const transformContent = async () => {
      setLoading(true)
      switch (initFormat) {
        case "html":
          const md = await convertedHTMLToMarkdown(contentRaw)
          setContent(md)
          break
        case "markdown":
          const doc = await convertedMarkdownToHTML(contentRaw)
          setContent(doc)
          break
        default:
          return
      }
      setLoading(false)
    }

    if (enabled) transformContent()
  }, [contentRaw])

  return { loading, content, raw: contentRaw }
}
