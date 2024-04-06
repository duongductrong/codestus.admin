import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight"
import { Color } from "@tiptap/extension-color"
import Image from "@tiptap/extension-image"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import TextStyle from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"
// import css from "highlight.js/lib/languages/css"
// import js from "highlight.js/lib/languages/javascript"
// import ts from "highlight.js/lib/languages/typescript"
// import html from "highlight.js/lib/languages/xml"
import { common, createLowlight } from "lowlight"
import { Markdown } from "tiptap-markdown"

const lowlight = createLowlight(common)

// lowlight.register({ css, js, ts, html })

export interface GetRichEditorExtensionsVariables {
  placeholder?: string
}

export const takeRichEditorExtensions = (variables?: GetRichEditorExtensionsVariables) => [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image.configure({
    inline: true,
  }),
  Placeholder.configure({
    placeholder: variables?.placeholder,
  }),
  Markdown.configure({
    html: true, // Allow HTML input/output
    tightLists: true, // No <p> inside <li> in markdown output
    tightListClass: "tight", // Add class to <ul> allowing you to remove <p> margins when tight
    bulletListMarker: "-", // <li> prefix in markdown output
    linkify: true, // Create links from "https://..." text
    breaks: true, // New lines (\n) in markdown input are converted to <br>
    transformPastedText: true, // Allow to paste markdown text in the editor
    transformCopiedText: true, // Copied text is transformed to markdown
  }),
]
