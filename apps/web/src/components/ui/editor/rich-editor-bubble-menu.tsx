import { BubbleMenu, Editor } from "@tiptap/react"
import React from "react"
import { SelectItemText } from "@radix-ui/react-select"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select"

export interface RichEditorBubbleMenuProps {
  editor: Editor | null
}

const RichEditorBubbleMenu = ({ editor }: RichEditorBubbleMenuProps) => {
  if (!editor) return null

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor: _editor }) => _editor.isActive("codeBlock")}
      tippyOptions={{
        inertia: true,
        duration: 300,
      }}
      className="z-10 flex gap-2 rounded bg-background p-2 text-sm shadow-md"
    >
      <Select onValueChange={() => console.log(123)}>
        <SelectTrigger className="max-w-[150px] shadow-none">Language</SelectTrigger>
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
    </BubbleMenu>
  )
}

export default RichEditorBubbleMenu
