import { Editor } from "@tiptap/react"
import { VariantProps, cva } from "class-variance-authority"
import {
  ALargeSmall,
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
import { Button } from "../button"

export const richEditorMenuBarVariants = cva(
  ["flex [&>*]:flex-shrink-0 items-center gap-2 rounded-full p-2"],
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
        horizontal: "",
      },
    },
    defaultVariants: {},
  },
)

export interface RichEditorMenuBarVariantsProps
  extends VariantProps<typeof richEditorMenuBarVariants> {}

export interface RichEditorMenuBarProps
  extends ComponentPropsWithoutRef<"div">,
    RichEditorMenuBarVariantsProps {
  editor: Editor | null

  root?: {
    width: number
    height: number
  }
}

export const RichEditorMenuBar = ({
  editor,
  className,
  direction,
  root,
  ...props
}: RichEditorMenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div {...props} className={cn(richEditorMenuBarVariants({ direction, className }))}>
      <Button
        size="icon"
        className="rounded-full"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        variant={editor.isActive("code") ? "secondary" : "ghost"}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <RemoveFormatting className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant={editor.isActive("paragraph") ? "secondary" : "ghost"}
      >
        <ALargeSmall className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
      >
        h1
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
      >
        h2
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
      >
        h3
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        variant={editor.isActive("heading", { level: 4 }) ? "secondary" : "ghost"}
      >
        h4
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        variant={editor.isActive("heading", { level: 5 }) ? "secondary" : "ghost"}
      >
        h5
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        variant={editor.isActive("heading", { level: 6 }) ? "secondary" : "ghost"}
      >
        h6
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
      >
        <Code2 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FoldHorizontal className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <SeparatorHorizontal className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        type="button"
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        variant={editor.isActive("textStyle", { color: "#958DF1" }) ? "secondary" : "ghost"}
      >
        <div className="h-4 w-4 rounded-full bg-[#958DF1]" />
      </Button>
    </div>
  )
}
