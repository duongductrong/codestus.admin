import { useEffect, useState } from "react"
import { generateHtmlFromMarkdownVFile, processMarkdown } from "./unified/unified"

export const useUnifiedTransformer = (contentRaw: string) => {
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState("")

  useEffect(() => {
    const transformContent = async () => {
      setLoading(true)
      const transformedContent = await generateHtmlFromMarkdownVFile(
        processMarkdown(contentRaw ?? ""),
      )

      setLoading(false)

      setContent(transformedContent)
    }

    transformContent()
  }, [contentRaw])

  return { loading, content, raw: contentRaw }
}
