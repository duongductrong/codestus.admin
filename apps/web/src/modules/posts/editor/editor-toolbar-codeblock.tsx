"use client"

import { SelectItemText } from "@radix-ui/react-select"
import { Editor } from "@tiptap/react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { cn } from "@/libs/utils/tailwind"

export interface EditorToolbarCodeblockProps {
  editor: Editor | null
}

const languages = [
  "js",
  "ts",
  "tsx",
  "jsx",
  "html",
  "css",
  "php",
  "python",
  "ruby",
  "java",
  "c",
  "csharp",
  "cpp",
  "swift",
  "kotlin",
  "shell",
  "bash",
  "powershell",
  "sql",
  "json",
  "yaml",
  "markdown",
  "plaintext",
]

const EditorToolbarCodeblock = ({ editor }: EditorToolbarCodeblockProps) => {
  if (!editor) return null

  const isActiveLanguage = (language: string) => editor.isActive("codeBlock", { language })

  const getTextFormatContent = () => {
    const lang = languages.find((language) => isActiveLanguage(language))

    return lang || "plaintext"
  }

  const handleChangeLanguage = (val: string) => {
    editor.chain().focus().setCodeBlock({ language: val }).run()
  }

  return (
    <Select onValueChange={handleChangeLanguage}>
      <SelectTrigger className={cn("max-w-[150px] shadow-none")}>
        {getTextFormatContent()}
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language} value={language}>
            <SelectItemText>{language}</SelectItemText>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default EditorToolbarCodeblock
