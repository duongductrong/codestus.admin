"use client"

import { SelectItemText } from "@radix-ui/react-select"
import { Editor } from "@tiptap/react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { cn } from "@/libs/utils/tailwind"

export interface EditorToolbarTextFormatProps {
  editor: Editor | null
}

const EditorToolbarTextFormat = ({ editor }: EditorToolbarTextFormatProps) => {
  if (!editor) return null

  const getTextFormatContent = () => {
    if (editor?.isActive("paragraph")) return "Paragraph"
    if (editor?.isActive("heading", { level: 1 })) return "Heading 1"
    if (editor?.isActive("heading", { level: 2 })) return "Heading 2"
    if (editor?.isActive("heading", { level: 3 })) return "Heading 3"
    if (editor?.isActive("heading", { level: 4 })) return "Heading 4"
    if (editor?.isActive("heading", { level: 5 })) return "Heading 5"
    if (editor?.isActive("heading", { level: 6 })) return "Heading 6"
    return "Paragraph"
  }

  const handleTextFormat = (val: string) => {
    switch (val) {
      case "paragraph":
        editor.chain().focus().setParagraph().run()
        break
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run()
        break
      case "h4":
        editor.chain().focus().toggleHeading({ level: 4 }).run()
        break
      case "h5":
        editor.chain().focus().toggleHeading({ level: 5 }).run()
        break
      case "h6":
        editor.chain().focus().toggleHeading({ level: 6 }).run()
        break
      default:
    }
  }

  return (
    <Select onValueChange={handleTextFormat}>
      <SelectTrigger className={cn("max-w-[150px] shadow-none")}>
        {getTextFormatContent()}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="paragraph">
          <SelectItemText>Paragraph</SelectItemText>
        </SelectItem>
        <SelectItem value="h1">
          <SelectItemText>Heading 1</SelectItemText>
        </SelectItem>
        <SelectItem value="h2">
          <SelectItemText>Heading 2</SelectItemText>
        </SelectItem>
        <SelectItem value="h3">
          <SelectItemText>Heading 3</SelectItemText>
        </SelectItem>
        <SelectItem value="h4">
          <SelectItemText>Heading 4</SelectItemText>
        </SelectItem>
        <SelectItem value="h5">
          <SelectItemText>Heading 5</SelectItemText>
        </SelectItem>
        <SelectItem value="h6">
          <SelectItemText>Heading 6</SelectItemText>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default EditorToolbarTextFormat
