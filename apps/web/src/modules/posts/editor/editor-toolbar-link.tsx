/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import { Editor } from "@tiptap/react"
import { LinkIcon, Unlink } from "lucide-react"
import React, { ElementRef, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/libs/utils/tailwind"

export interface EditorToolbarLinkProps {
  editor: Editor | null
}

const EditorToolbarLink = ({ editor }: EditorToolbarLinkProps) => {
  if (!editor) return null

  const [open, setOpen] = useState(false)
  const inputRef = useRef<ElementRef<typeof Input>>(null)

  const handleAddLink: React.FormEventHandler = (e) => {
    e?.preventDefault()

    const link = inputRef.current?.value

    if (!link) {
      // eslint-disable-next-line no-alert
      alert("Please enter a link")
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run()
  }

  const handleUnlink = () => {
    if (!editor.getAttributes("link")) {
      // eslint-disable-next-line no-alert
      alert("No link to remove")
      return
    }
    editor.chain().focus().extendMarkRange("link").unsetLink().run()
  }

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current && open) {
        inputRef.current.value = editor.getAttributes("link")?.href || ""
      }
    })
  }, [open, inputRef.current])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn("max-w-[250px] shadow-none")} asChild>
        <Button type="button" size="icon" variant="ghost">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex items-center gap-2 p-2" asChild>
        <form onSubmit={handleAddLink} onReset={handleUnlink} className="flex items-center gap-2">
          <Input ref={inputRef} placeholder="Enter your url" type="url" />
          <Button type="submit">Add link</Button>
          <Button type="reset" variant="outline" size="icon" className="shrink-0">
            <Unlink className="h-4 w-4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default EditorToolbarLink
