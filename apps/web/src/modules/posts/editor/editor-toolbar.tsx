/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import { SelectItemText } from "@radix-ui/react-select"
import { VariantProps, cva } from "class-variance-authority"
import {
  Bold,
  Code,
  Code2,
  FoldHorizontal,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  RemoveFormatting,
  SeparatorHorizontal,
  Strikethrough,
  Undo,
} from "lucide-react"
import { ComponentPropsWithoutRef } from "react"
import { cn } from "@/libs/utils/tailwind"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCurrentEditorContext } from "./use-editor-context"

export const toolbarEditorVariants = cva(
  ["flex [&>*]:flex-shrink-0 items-center gap-2 p-2 border-b"],
  {
    variants: {
      direction: {
        vertical: cn(
          "border",
          "max-h-[600px] overflow-y-auto no-scrollbar",
          "fixed bottom-4 flex-col max-w-[58px] items-start",
          "top-[var(--rich-editor-offset-top)]",
          "left-[calc(var(--rich-editor-offset-left)+var(--rich-editor-width)+1rem)]",
          "bg-background",
        ),
        horizontal: [
          "justify-center z-20",
          "sticky top-[var(--el-header-height)] left-0 bg-background h-[var(--el-toolbar-height)]",
        ],
      },
    },
    defaultVariants: {},
  },
)

export interface EditorToolbarVariantsProps extends VariantProps<typeof toolbarEditorVariants> {}

export interface EditorToolbarProps
  extends ComponentPropsWithoutRef<"div">,
    EditorToolbarVariantsProps {
  root?: {
    width: number
    height: number
  }
}

const EditorToolbar = ({ className, direction, root, ...props }: EditorToolbarProps) => {
  const editor = useCurrentEditorContext()

  if (!editor) {
    return null
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

  return (
    <div className={cn(toolbarEditorVariants({ direction: "horizontal", className }))}>
      <Button
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
      <Select onValueChange={handleTextFormat}>
        <SelectTrigger className="max-w-[150px] shadow-none">
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
      <Button
        size="icon"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        variant={editor.isActive("code") ? "secondary" : "ghost"}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <RemoveFormatting className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
      >
        <Code2 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FoldHorizontal className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <SeparatorHorizontal className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        variant={editor.isActive("textStyle", { color: "#958DF1" }) ? "secondary" : "ghost"}
      >
        <div className="h-4 w-4 rounded-full bg-[#958DF1]" />
      </Button>
    </div>
  )
}

export default EditorToolbar
